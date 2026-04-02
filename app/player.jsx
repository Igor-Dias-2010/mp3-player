'use client'

import { useState } from "react"
import { Send } from "lucide-react"

export default function Player() {
    const [file, setFile] = useState(null)
    const [audioUrl, setAudioUrl] = useState('')

    function handleFileChange(e) {
        const selectedFile = e.target.files[0]
        setFile(selectedFile)
    }

    async function handleUpload() {
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        })

        const fileName = await res.text()

        setAudioUrl(`/uploads/${fileName}`)
    }

    return (
        <div>
            <h1>Mp3 Player</h1>

            <input type="file" accept="audio/*" onChange={handleFileChange} />
            <button onClick={handleUpload}><Send className="icon" />Send</button>

            {audioUrl && (
                <audio controls src={audioUrl}></audio>
            )}
        </div>
    )
}