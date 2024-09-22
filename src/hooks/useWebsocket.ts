// hooks/useWebSocket.ts
import { useEffect, useRef, useState } from 'react'

const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<string>()
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    ws.current = new WebSocket(url)

    ws.current.onmessage = async (event) => {
      console.log('recieve', 'JSON.parse(JSON.parse(event.data))') // For non-Blob messages
      setMessages(JSON.parse(JSON.parse(event.data)))
    }

    ws.current.onopen = () => {
      console.log('WebSocket connected')
    }

    ws.current.onclose = () => {
      console.log('WebSocket disconnected')
    }

    return () => {
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [url])

  const sendMessage = (message: string) => {
    console.log('sending message')
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message)
      console.log('message send')
    }
  }

  return { messages, sendMessage }
}

export default useWebSocket
