'use client';

export function GoogleMap() {
  return (
    <section className="h-[400px] md:h-[500px] w-full relative">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111072.18821998592!2d40.91632788523916!3d30.984025078174523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15317781b0a544c7%3A0xc3ba596d11a2f646!2sArar%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1711234567890!5m2!1sen!2sus" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen={true} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Arar Residency Location"
        className="grayscale opacity-90 contrast-125 mix-blend-luminosity dark:invert"
      />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.1)]"></div>
    </section>
  );
}
