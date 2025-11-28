import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const ContactModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset form when modal closes
      setTitle('');
      setMessage('');
      setContactInfo('');
      setIsSuccess(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call
    console.log('Sending:', { title, message, contactInfo });

    // Show success message
    setIsSuccess(true);

    // Auto close after 7 seconds
    setTimeout(() => {
      onClose();
    }, 5000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="contact-modal-title"
    >
      <div
        className="bg-[#1f2937] rounded-2xl p-8 w-full max-w-xl mx-4 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            id="contact-modal-title"
            className="text-2xl font-semibold text-white"
          >
            Contact the Developer
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            aria-label="Close contact modal"
          >
            <CloseIcon />
          </button>
        </div>

        {isSuccess ? (
          /* Success Message */
          <div className="text-center py-8">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <p className="text-white text-lg font-medium">
              Your message has been successfully sent to the developer.
            </p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label
                htmlFor="contact-title"
                className="block text-sm font-medium text-white/90 mb-3"
              >
                Title <span className="text-white/50 text-xs">(Optional)</span>
              </label>
              <input
                id="contact-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#2d3748] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="What's this about?"
              />
            </div>

            {/* Message Input */}
            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-white/90 mb-3"
              >
                Message{' '}
                <span className="text-white/50 text-xs">(Optional)</span>
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full bg-[#2d3748] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                placeholder="Share your brilliant ideas, feature requests that would make this even better, or any feedback that could help improve the experience. Your thoughts matter!"
              />
            </div>

            {/* Contact Info Input (Optional) */}
            <div>
              <label
                htmlFor="contact-info"
                className="block text-sm font-medium text-white/90 mb-3"
              >
                How to contact you back{' '}
                <span className="text-white/50 text-xs">(Optional)</span>
              </label>
              <input
                id="contact-info"
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="w-full bg-[#2d3748] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Your email, Twitter handle, or any way to reach you"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <SendIcon />
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
