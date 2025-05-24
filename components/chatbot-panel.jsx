"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export function ChatbotPanel() {
  const [message, setMessage] = useState("")
  const [history, setHistory] = useState([
    { role: "assistant", content: "Hello! I'm your MediQuick assistant. Please describe your symptoms, and I'll help assess your situation." }
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const chatContainerRef = useRef(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [history, loading])

  const handleSend = async () => {
    if (!message.trim()) return
    setError("")
    const newHistory = [...history, { role: "user", content: message }]
    setHistory(newHistory)
    setMessage("")
    setLoading(true)
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setHistory([...newHistory, { role: "assistant", content: data.text }])
    } catch (err) {
      setError("Sorry, something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="bg-emerald-50 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 font-heading">
          <Bot className="h-5 w-5 text-emerald-600" />
          AI Symptom Analyzer
        </CardTitle>
        <CardDescription>Describe your symptoms and our AI will analyze them</CardDescription>
      </CardHeader>
      <CardContent className="p-4 h-64 overflow-y-auto bg-white" ref={chatContainerRef}>
        <div className="space-y-4">
          {history.map((msg, idx) => (
            <div
              key={idx}
              className={
                msg.role === "assistant"
                  ? "flex items-start gap-2"
                  : "flex items-start gap-2 justify-end"
              }
            >
              {msg.role === "assistant" && (
                <div className="bg-emerald-100 p-2 rounded-full">
                  <Bot className="h-4 w-4 text-emerald-600" />
                </div>
              )}
              <div
                className={
                  msg.role === "assistant"
                    ? "bg-emerald-50 p-3 rounded-lg max-w-[80%]"
                    : "bg-white border border-slate-200 p-3 rounded-lg max-w-[80%]"
                }
              >
                <p className="text-sm text-slate-700 whitespace-pre-line">{msg.content}</p>
              </div>
              {msg.role === "user" && (
                <div className="bg-slate-200 p-2 rounded-full">
                  <div className="h-4 w-4 bg-slate-500 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-start gap-2">
              <div className="bg-emerald-100 p-2 rounded-full">
                <Bot className="h-4 w-4 text-emerald-600 animate-bounce" />
              </div>
              <div className="bg-emerald-50 p-3 rounded-lg max-w-[80%]">
                <p className="text-sm text-slate-700">Thinking...</p>
              </div>
            </div>
          )}
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 bg-white">
        <div className="flex w-full gap-2">
          <Textarea
            placeholder="Describe your symptoms..."
            className="min-h-10 resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <div className="flex flex-col gap-2">
            <Button size="icon" variant="outline" disabled>
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="bg-emerald-500 hover:bg-emerald-600"
              onClick={handleSend}
              disabled={loading || !message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
