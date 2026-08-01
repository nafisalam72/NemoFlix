import { useEffect } from 'react';

export default function AdBanner({ type = 'horizontal' }) {
  // আপনার Google AdSense-এর Publisher ID
  const clientID = "ca-pub-9115388853341654"; 
  // Slot ID (AdSense ড্যাশবোর্ড থেকে পাবেন)
  const slotID = type === 'horizontal' ? "1234567890" : "0987654321";

  useEffect(() => {
    try {
      // AdSense-কে কল করা হচ্ছে যেন অ্যাড লোড হয়
      if (window.adsbygoogle && process.env.NODE_ENV !== 'development') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`w-full flex items-center justify-center my-6 bg-dark/30 border border-gray-800/50 rounded-lg overflow-hidden ${type === 'horizontal' ? 'min-h-[100px]' : 'min-h-[250px]'}`}>
      {/* 
        লোকালহোস্টে অ্যাড দেখাবে না, শুধু লাইভ সার্ভারে দেখাবে। 
        তাই নিচে আপনার AdSense-এর আসল কোডগুলো কাজ করবে। 
      */}
      <ins 
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={clientID}
        data-ad-slot={slotID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      
      {/* ডেভেলপমেন্টের সময় যাতে বোঝা যায় এখানে অ্যাড থাকবে, তাই একটি প্লেসহোল্ডার */}
      {process.env.NODE_ENV === 'development' && (
        <span className="text-gray-600 text-sm absolute">Advertisement Space ({type})</span>
      )}
    </div>
  );
}
