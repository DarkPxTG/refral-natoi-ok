import { NextApiRequest, NextApiResponse } from 'next';

// شیء برای ذخیره رفرال‌ها در حافظه موقت (تا وقتی سرور ریست نشه)
let referralData: Record<string, { referrer: string | null; referrals: string[] }> = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // گرفتن userId و referrerId از بادی درخواست
    const { userId, referrerId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    // اگر کاربر قبلاً ثبت نشده باشد، مقدار اولیه بده
    if (!referralData[userId]) {
      referralData[userId] = { referrer: null, referrals: [] };
    }

    // اگر referrerId وجود داشت و قبلاً ثبت نشده بود، اضافه کن
    if (referrerId && !referralData[userId].referrer) {
      referralData[userId].referrer = referrerId;
      if (!referralData[referrerId]) {
        referralData[referrerId] = { referrer: null, referrals: [] };
      }
      referralData[referrerId].referrals.push(userId);
    }

    return res.status(200).json({ message: 'Referral saved successfully' });
  }

  if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    const data = referralData[userId] || { referrer: null, referrals: [] };
    return res.status(200).json(data);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
