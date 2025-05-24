"use client"
import { useRef, useState, useEffect } from "react"
import domtoimage from "dom-to-image-more"
import QRCode from "qrcode"
// Placeholder Modal component; replace with your own if available
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative min-w-[300px]">
        <button onClick={onClose} className="absolute top-2 right-2 text-slate-400 hover:text-emerald-600">✕</button>
        {children}
      </div>
    </div>
  )
}

export function HealthCard({ user }) {
  const cardRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const [qrUrl, setQrUrl] = useState("")
  const url = `https://yourapp.com/report/${user.id}`

  useEffect(() => {
    QRCode.toDataURL(url, { width: 180, margin: 2 }, (err, dataUrl) => {
      if (!err) setQrUrl(dataUrl)
    })
  }, [url])

  const handleDownload = async (e) => {
    try {
      if (e) e.preventDefault();
      if (cardRef.current) {
        const dataUrl = await domtoimage.toPng(cardRef.current, { scale: 2 });
        const link = document.createElement('a');
        link.download = `${user.name}-health-card.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download card. Please try again.");
    }
  }

  return (
    <div>
      <div ref={cardRef} className="max-w-xs min-w-[350px] rounded-xl shadow-lg bg-white p-8 flex flex-col items-center border border-slate-200">
        <img
          src={user.photoURL || '/placeholder-user.jpg'}
          alt="User"
          className="w-24 h-24 rounded-full mb-4 border-2 border-emerald-400"
        />
        <div className="text-xl font-bold text-slate-800 mb-3 text-center break-words w-full">{user.name}</div>
        <div className="text-base text-slate-500 mb-5 text-center break-words w-full">{user.email}</div>
        {/* Customizable info */}
        <div className="text-sm text-slate-600 mb-4 text-center">
          Blood Group: <span className="font-semibold">{user.bloodGroup || "N/A"}</span><br />
          Allergies: <span className="font-semibold">{user.allergies || "None"}</span>
        </div>
        {qrUrl && <img src={qrUrl} alt="QR Code" className="mb-4 bg-white p-2 rounded" width={140} height={140} />}
        <div className="text-xs text-slate-400 text-center mb-1">
          Scan to access health report
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-emerald-500 text-white rounded"
        >
          Download Card
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-slate-200 text-slate-800 rounded"
        >
          Share with Doctor
        </button>
      </div>
      {/* Doctor Mode Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="flex flex-col items-center p-4">
            {qrUrl && <img src={qrUrl} alt="QR Code" width={180} height={180} className="bg-white p-2 rounded" />}
            <div className="mt-2 text-xs text-slate-600">
              Doctor can scan this QR or visit:<br />
              <a href={url} className="text-emerald-600 underline">{url}</a>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
} 