import { useState } from 'react'
import { Button, message, Modal, Rate } from 'antd'
import { createRating, saveMedia } from '../../../services/ratingService'

const RateModal = ({ isVisible, setIsVisible, hasRated, setHasRated, caption, file }) => {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const ratingLabels = ["Very Poor", "Poor", "Average", "Good", "Excellent"]
  const [isLoading, setIsLoading] = useState(false)

  const handleRate = async () => {
    if (rating === 0) {
      message.error("Please provide a star rating.")
      return
    }

    if (hasRated) {
      message.error('You have already submitted a rating.')
      return
    }

    const formData = {
      rate: rating,
      caption: caption.title,
      name: caption.name,
      instructions: caption.instructions,
      ingredients: caption.ingredients,
      feedback: feedback
    }

    setIsLoading(true)
    try {
      const mediaUrl = await saveMedia(file, localStorage.getItem('at'))
      formData.media_url = mediaUrl
      await createRating(formData, localStorage.getItem('at'))
      setIsVisible(false)
      setHasRated(true)
      message.success("Rating submitted successfully!")
    } catch (error) {
      message.error("Failed to save rating. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    setRating(0)
    setFeedback("")
  }

  const modalStyles = `
    .custom-modal .ant-modal-content {
      background-color: #1e293b;
      color: #f8fafc;
    }
    .custom-modal .ant-modal-header {
      background-color: #1e293b;
      border-bottom: 1px solid #334155;
    }
    .custom-modal .ant-modal-footer {
      background-color: #1e293b;
      border-top: 1px solid #334155;
    }
    .custom-modal .ant-modal-close-x {
      color: #e2e8f0;
    }
    .custom-modal .ant-rate-star:not(.ant-rate-star-full) .ant-rate-star-first,
    .custom-modal .ant-rate-star:not(.ant-rate-star-full) .ant-rate-star-second {
      color: #475569;
    }
    .custom-modal .ant-rate-star-full .ant-rate-star-first,
    .custom-modal .ant-rate-star-full .ant-rate-star-second {
      color: #fbbf24;
    }
  `

  return (
    <>
      <style>{modalStyles}</style>
      <Modal
        open={isVisible}
        onCancel={handleClose}
        footer={
          <div className="pt-4 flex justify-end">
            <Button
              type="primary"
              onClick={handleRate}
              loading={isLoading}
            >
              Submit Rating
            </Button>
          </div>
        }
        width={700}
        title={
          <div className="bg-slate-800 py-2">
            <p className="text-center text-2xl not-md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              Share Your Feedback
            </p>
          </div>
        }
        className="custom-modal"
      >
        <div className="flex flex-col gap-6 not-md:gap-3 md:p-4 not-md:pt-2.5 bg-slate-800">
          <div className="text-center">
            <h3 className="text-lg not-md:text-base font-semibold text-emerald-200">How do you feel?</h3>
            <p className="md:mt-2.5 text-sm text-zinc-300 not-md:hidden">Please leave a rating to help us improve our service!</p>
          </div>

          <div className="flex flex-col items-center">
            <Rate className="md:!text-2xl not-md:!text-xl" onChange={setRating} value={rating} disabled={hasRated} />
            {rating > 0 && <p className="mt-3 not-md:mt-2 text-lg not-md:text-sm font-semibold text-amber-300">{ratingLabels[rating - 1]}</p>}
          </div>

          <div>
            <h3 className="text-lg not-md:text-base font-semibold text-emerald-200 mb-1">Any suggestions?</h3>
            <textarea
              className="w-full p-3 border border-slate-600 rounded-lg outline-none bg-slate-700 text-stone-100 resize-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all duration-200"
              placeholder="Enter your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={window.innerWidth >= 760 ? 6 : 4}
              disabled={hasRated}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default RateModal