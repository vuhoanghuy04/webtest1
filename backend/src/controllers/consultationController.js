import { createConsultation, getConsultations } from '../services/consultationService.js';

export async function create(req, res, next) {
  try {
    const consultation = await createConsultation(req.body, req.user);
    res.status(201).json({
      message: 'Gửi yêu cầu tư vấn thành công.',
      consultation,
    });
  } catch (error) {
    next(error);
  }
}

export async function list(_req, res, next) {
  try {
    const consultations = await getConsultations();
    res.status(200).json({ consultations });
  } catch (error) {
    next(error);
  }
}
