"use client";

import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import Auth from "./components/Auth";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  Plus,
  Check,
  Trash2,
  LogOut,
  CheckCircle2,
  Target,
  Clock,
  Trophy,
} from "lucide-react";

interface ToDo {
  id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      if (user) {
        const querySnapshot = await getDocs(
          collection(db, "users", user.uid, "todos")
        );
        const todosData = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as ToDo)
        );
        setTodos(todosData);
      }
    };
    fetchTodos();
  }, [user]);

  const addTodo = async () => {
    if (newTodo.trim() !== "" && user) {
      setIsLoading(true);
      try {
        const docRef = await addDoc(
          collection(db, "users", user.uid, "todos"),
          {
            text: newTodo,
            completed: false,
          }
        );
        setTodos([
          { id: docRef.id, text: newTodo, completed: false },
          ...todos,
        ]);
        setNewTodo("");
      } catch (error) {
        console.error("Error adding todo:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo && user) {
      try {
        await updateDoc(doc(db, "users", user.uid, "todos", id), {
          completed: !todo.completed,
        });
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };

  const deleteTodo = async (id: string) => {
    if (user) {
      try {
        await deleteDoc(doc(db, "users", user.uid, "todos", id));
        setTodos(todos.filter((todo) => todo.id !== id));
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      addTodo();
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  To Do List By นัก dev ฝึกหัด
                </h1>
                <p className="text-sm text-gray-600">
                  สวัสดี,{" "}
                  {user.displayName || user.email?.split("@")[0] || "Developer"}
                  !
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">
                  นักพัฒนาฝึกหัด
                </span>
              </div>
              <button
                onClick={() => auth.signOut()}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">ออกจากระบบ</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
                <p className="text-sm text-gray-600">งานทั้งหมด</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {completedCount}
                </p>
                <p className="text-sm text-gray-600">เสร็จแล้ว</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {totalCount - completedCount}
                </p>
                <p className="text-sm text-gray-600">กำลังทำ</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {totalCount > 0
                    ? Math.round((completedCount / totalCount) * 100)
                    : 0}
                  %
                </p>
                <p className="text-sm text-gray-600">ความคืบหน้า</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Todo Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/50 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            เพิ่มงานใหม่
          </h2>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="มีงานอะไรที่ต้องทำวันนี้?"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
            <button
              onClick={addTodo}
              disabled={isLoading || !newTodo.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Plus className="w-5 h-5" />
              )}
              <span className="hidden sm:inline">
                {isLoading ? "กำลังเพิ่ม..." : "เพิ่มงาน"}
              </span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
          {[
            { key: "all", label: "ทั้งหมด", count: totalCount },
            {
              key: "active",
              label: "กำลังทำ",
              count: totalCount - completedCount,
            },
            { key: "completed", label: "เสร็จแล้ว", count: completedCount },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setFilter(key as any)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                filter === key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {label}
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  filter === key
                    ? "bg-purple-100 text-purple-600"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50">
              <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">
                {filter === "completed"
                  ? "ยังไม่มีงานที่เสร็จ"
                  : filter === "active"
                  ? "ไม่มีงานที่กำลังทำ"
                  : "ยังไม่มีงานเลย"}
              </p>
              <p className="text-gray-400 text-sm">
                {filter === "all" && "เพิ่มงานแรกของคุณเพื่อเริ่มต้น!"}
                {filter === "active" && "งานทั้งหมดเสร็จแล้ว เก่งมาก! 🎉"}
                {filter === "completed" && "เมื่อทำงานเสร็จแล้วจะปรากฏที่นี่"}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo, index) => (
              <div
                key={todo.id}
                className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200/50 transition-all duration-200 hover:shadow-md hover:scale-[1.01] ${
                  todo.completed ? "opacity-75" : ""
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110 ${
                      todo.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-400 hover:bg-green-50"
                    }`}
                  >
                    {todo.completed && <Check className="w-4 h-4" />}
                  </button>

                  <div className="flex-1">
                    <p
                      className={`text-gray-900 transition-all ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.text}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Progress Bar */}
        {totalCount > 0 && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/50">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">
                ความคืบหน้าโดยรวม
              </span>
              <span className="text-sm text-gray-500">
                {completedCount}/{totalCount} งานเสร็จแล้ว (
                {Math.round((completedCount / totalCount) * 100)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              ></div>
            </div>
            {completedCount === totalCount && totalCount > 0 && (
              <div className="mt-4 text-center">
                <p className="text-green-600 font-semibold">
                  🎉 ยินดีด้วย! งานทั้งหมดเสร็จแล้ว!
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  คุณทำได้ดีมาก นักพัฒนาฝึกหัด!
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
