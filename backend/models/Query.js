const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  channel: {
    type: String,
    enum: [
      'email',
      'instagram',
      'twitter',
      'facebook',
      'website',
      'live_chat',
      'whatsapp',
      'linkedin'
    ],
    required: true
  },

  message: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: [
      'question',
      'complaint',
      'request',
      'refund',
      'bug',
      'feature_request',
      'payment_issue',
      'feedback',
      'cancellation',
      'account_issue',
      'priority_support_request'
    ],
    default: 'question'
  },

  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },

  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved'],
    default: 'open'
  },

  // 🔥 Assign feature (works 100% with your controllers)
  assignedTo: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Query', QuerySchema);