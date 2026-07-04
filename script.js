// อ้างอิงองค์ประกอบที่ใช้ในหน้าเว็บ
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainImage = document.getElementById('mainImage');
const mainTitle = document.getElementById('mainTitle');
const subText = document.getElementById('subText');
const floatingHearts = document.getElementById('floatingHearts');
const body = document.body;

// สร้างหัวใจลอยตามพื้นหลังเพื่อให้หน้าเว็บน่ารักขึ้น (ลอยจากล่างขึ้นบน)
function createFloatingHearts() {
  const hearts = ['💗', '💖', '💕', '💞', '💓'];
  const count = 20;

  for (let i = 0; i < count; i += 1) {
    const span = document.createElement('span');
    span.textContent = hearts[i % hearts.length];
    span.style.left = `${Math.random() * 100}%`;
    span.style.bottom = `-50px`; 
    span.style.animationDelay = `${Math.random() * 5}s`;
    span.style.animationDuration = `${6 + Math.random() * 4}s`;
    span.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 200}px`);
    floatingHearts.appendChild(span);
  }
}

// ย้ายปุ่มไม่รักให้หนีเมาส์/นิ้ว ทั่วทั้งหน้าจอ
function moveNoButton() {
  if (body.classList.contains('loved')) return;

  // หากเป็นการหนีครั้งแรก ให้ล็อกตำแหน่งเดิมเป็น fixed ก่อนเพื่อไม่ให้ปุ่มรักเสียตำแหน่ง
  if (!noBtn.classList.contains('is-fleeing')) {
    const rect = noBtn.getBoundingClientRect();
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${rect.left}px`;
    noBtn.style.top = `${rect.top}px`;
    noBtn.classList.add('is-fleeing');
  }

  const padding = 30;
  // คำนวณขอบเขตหน้าจอที่ปลอดภัยไม่ให้ปุ่มหลุดจอ
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const nextX = Math.max(padding, Math.random() * maxX);
  const nextY = Math.max(padding, Math.random() * maxY);

  noBtn.style.left = `${nextX}px`;
  noBtn.style.top = `${nextY}px`;
}

// ป้องกันการกดปุ่มไม่รักทุกวิถีทาง
noBtn.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  moveNoButton();
});

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (event) => {
  event.preventDefault(); // กันไม่ให้เกิด click event ซ้อนบนมือถือ
  moveNoButton();
});

// ตรวจจับระยะห่าง ถ้าเมาส์เข้าใกล้ในระยะ 120px ให้กระโดดหนีทันที
window.addEventListener('mousemove', (event) => {
  if (body.classList.contains('loved')) return;

  const rect = noBtn.getBoundingClientRect();
  const btnCenterX = rect.left + rect.width / 2;
  const btnCenterY = rect.top + rect.height / 2;
  
  const distance = Math.hypot(event.clientX - btnCenterX, event.clientY - btnCenterY);

  if (distance < 120) {
    moveNoButton();
  }
});

// เมื่อกดปุ่มรัก ให้แปลงหน้าเป็นผลลัพธ์สุดน่ารัก
yesBtn.addEventListener('click', () => {
  body.classList.add('loved');
  mainImage.src = 'love.jpg';
  mainImage.alt = 'ภาพรักที่บอกว่าเค้ารักพลอย';
  mainTitle.textContent = 'เย้ เค้าก็รักพลอยเหมือนกันนนน ';
  subText.textContent = 'ไอหมูพอย 💗';

  // ซ่อนปุ่มไม่รักไปเลยหลังจากสมหวังแล้ว
  noBtn.style.display = 'none';

  // สร้างหัวใจพุ่งเพิ่มเติมฉลองความรัก
  for (let i = 0; i < 15; i += 1) {
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = ['💗', '💖', '💕'][i % 3];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${3 + Math.random() * 3}s`;
    heart.style.animationDelay = `${Math.random() * 1.5}s`;
    document.body.appendChild(heart);
  }
});

// เรียกใช้งานระบบพื้นหลัง
createFloatingHearts();