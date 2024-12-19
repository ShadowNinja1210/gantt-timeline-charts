import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  progress: { type: Number, default: 0 },
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);

