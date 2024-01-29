/* lenis */
const lenis = new Lenis();

lenis.on('scroll', e => {
    // console.log(e);
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add(time => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/* gsap */
let time1 = gsap.timeline();
time1.from('.load-img', 2, {
    y: 50,
    opacity: 0,
    ease: Expo.easeInOut,
});
time1.to(
    '.load-img',
    1,
    {
        y: -50,
        opacity: 0,
        ease: Expo.easeInOut,
    },
    'a',
);
time1.from(
    '.loader',
    1,
    {
        y: 30,
        opacity: 0,
        ease: Expo.easeInOut,
    },
    'a',
);
time1.staggerFrom(
    '.blocks',
    0.8,
    {
        width: '0%',
        ease: Power1.easeIn,
        delay: 1.5,
    },
    0.04,
    'b',
);
time1.to(
    '.loader',
    1,
    {
        x: 2,
        opacity: 0,
        ease: Expo.easeInOut,
        delay: 1.5,
    },
    'b',
);
time1.to(
    '.load-container',
    1,
    {
        opacity: 0,
        display: 'none',
        ease: Expo.easeInOut,
    },
    '-=0.8',
);

time1.from('.logo-area', {
    y: -50,
    opacity: 0,
    ease: 'power4.out',
});
time1.from('.btn-menu', {
    transform: 'scale(0.5)',
    opacity: 0,
    ease: 'power4.out',
});

time1.from('.holographic-bg', 1, {
    scale: 1.1,
    opacity: 0,
    ease: 'power4.InOut',
});

time1.to(
    '.sc-intro .title1',
    0.5,
    {
        y: 0,
        opacity: 1,
        ease: 'power4.InOut',
    },
    '-=0.6',
);
time1.to(
    '.sc-intro .title2',
    0.5,
    {
        y: 0,
        opacity: 1,
        ease: 'power4.InOut',
    },
    '-=0.3',
);

gsap.to('.holographic-bg img', {
    opacity: 0,
    scale: 1.2,
    rotate: '45deg',
    scrollTrigger: {
        trigger: '.content',
        start: 'top 0%',
        scrub: 1,
        // markers: true,
    },
});

let time2 = gsap.timeline();
time2.set('.nav-item', {
    y: -30,
    opacity: 0,
});
time2.to('.nav-item', {
    stagger: 0.3,
    y: 0,
    opacity: 1,
    ease: Expo.easeInOut,
    delay: 0.5,
});
time2.from('.util-area', {
    y: 50,
    opacity: 0,
    ease: Expo.easeInOut,
});
time2.to(
    '.nav-list',
    1,
    {
        backgroundSize: '100%',
        ease: Expo.easeInOut,
    },
    '-=0.5',
);
time2.to('.nav-list', 1, {
    backgroundSize: '0%',
    ease: Expo.easeInOut,
});
time2.pause();

gsap.to('.sc-about .bg-box', {
    yPercent: 10,
    scrollTrigger: {
        trigger: '.sc-about',
        start: 'top 80%',
        end: 'bottom 0%',
        scrub: 1,
        // markers: true,
    },
});

let txtUp = gsap.from('.sc-about .txt-up', {
    stagger: 0.3,
    y: 30,
    opacity: 0,
});
txtUp.pause();
ScrollTrigger.create({
    trigger: '.sc-about',
    start: 'top 30%',
    // markers: true,
    onEnter: () => {
        txtUp.play();
    },
    onLeaveBack: () => {
        txtUp.reverse();
    },
});

gsap.from('.sc-about .stack-loop', {
    xPercent: 10,
    scrollTrigger: {
        trigger: '.sc-about',
        start: '20% 30%',
        scrub: 1,
        // markers: true,
    },
});

let time3 = gsap.timeline();
time3.from('.sc-contact .desc', {
    x: -100,
    opacity: 0,
});
time3.from(
    '.sc-contact .contact .left > *',
    {
        x: -100,
        opacity: 0,
        stagger: 0.1,
    },
    '-=0.2',
);
time3.from(
    '.sc-contact .contact .right > *',
    {
        x: -100,
        opacity: 0,
        stagger: 0.1,
    },
    '-=0.5',
);
time3.pause();
ScrollTrigger.create({
    trigger: '.sc-contact',
    start: '0% 70%',
    // markers: true,
    onEnter: () => {
        time3.play();
    },
    onLeaveBack: () => {
        time3.reverse();
    },
});

/* index */
// gnb메뉴 toggle 버튼
const btnMenu = document.querySelector('.btn-menu');
const gnb = document.querySelector('.gnb');
btnMenu.addEventListener('click', function () {
    this.classList.toggle('on');
    gnb.classList.toggle('open');
    document.querySelector('html').classList.toggle('hidden');

    if (gnb.classList.contains('open')) {
        time2.restart();
    }
});

const secTop1 = document.querySelector('.sc-intro').offsetTop;
const secTop2 = document.querySelector('.sc-project').offsetTop;
const secTop3 = document.querySelector('.sc-about').offsetTop;
const secTop4 = document.querySelector('.sc-contact').offsetTop;
// console.log(secTop1, secTop2, secTop3, secTop4);

const navListAll = document.querySelectorAll('.nav-list a');
navListAll.forEach((list, i) => {
    list.addEventListener('click', function (e) {
        e.preventDefault();

        btnMenu.classList.remove('on');
        gnb.classList.remove('open');
        document.querySelector('html').classList.remove('hidden');

        if (i == 0) {
            window.scrollTo({ top: secTop1, behavior: 'smooth' });
        } else if (i == 1) {
            window.scrollTo({ top: secTop2, behavior: 'smooth' });
        } else if (i == 2) {
            window.scrollTo({ top: secTop3, behavior: 'smooth' });
        } else if (i == 3) {
            window.scrollTo({ top: secTop4, behavior: 'smooth' });
        }
    });
});

// 스크롤시, header
let lastScroll = 0;
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    // console.log(this.scrollY);
    current = this.scrollY;
    if (current == 0) {
        header.style.backgroundColor = 'transparent';
    } else {
        header.style.backgroundColor = 'rgba(28, 28, 28, 0.9)';
    }

    if (current > lastScroll) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
    lastScroll = current;
});

// gnb menu hover effect
let textEl = document.querySelectorAll('.gnb .text');
textEl.forEach(el => {
    let innerText = el.innerText; //텍스트 지우기전에 변수에 담아둠
    el.innerHTML = '';

    let textContain = document.createElement('div');
    textContain.classList.add('block');

    // 텍스트의 글자수만큼 span 생성
    for (let letter of innerText) {
        let span = document.createElement('span');
        // 현재 글자가 공백인 경우에는 공백 대신 '\xa0' (비어있는 공간)을 설정하고, 그렇지 않은 경우에는 그대로 설정
        span.innerText = letter.trim() === '' ? '\xa0' : letter;
        span.classList.add('letter');
        textContain.appendChild(span);
    }

    el.appendChild(textContain);
    el.appendChild(textContain.cloneNode(true));
});
textEl.forEach(el => {
    el.addEventListener('mouseover', () => {
        el.classList.remove('play');
    });
});

// 프로젝트 로고이미지 마우스 움직임
let hoverImage = document.querySelectorAll('.prj-item .img-box');
function showImage(e) {
    for (let i = 0; i < hoverImage.length; i++) {
        hoverImage[i].style.left = e.pageX + 'px';
        hoverImage[i].style.top = e.pageY + 'px';
    }
}
const cursor = document.querySelector('.cursor');
const prjSec = document.querySelectorAll('.sc-project .prj-item');
// document.addEventListener('mousemove', showImage);
prjSec.forEach(prj => {
    prj.addEventListener('mousemove', showImage);
    prj.addEventListener('mouseover', function () {
        cursor.style.display = 'none';
    });
    prj.addEventListener('mouseleave', function () {
        cursor.style.display = 'block';
    });
});

function mousePointEvent() {
    // cursor point커스텀
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
    // 특정영역에서 cursor point 확대
    const allElements = document.querySelectorAll('*');
    let pointTxt = Array.from(allElements).filter(function (el) {
        return el.dataset.hover === 'on';
    });
    pointTxt.forEach(txt => {
        txt.addEventListener('mouseover', function () {
            cursor.classList.add('on');
        });
        txt.addEventListener('mouseleave', function () {
            cursor.classList.remove('on');
        });
    });
    const allLink = document.querySelectorAll('a');
    allLink.forEach(a => {
        a.addEventListener('mouseover', function () {
            cursor.classList.add('on');
        });
        a.addEventListener('mouseleave', function () {
            cursor.classList.remove('on');
        });
    });
}

if (window.matchMedia('(min-width: 1024px)').matches) {
    mousePointEvent();
} else {
    console.log('size not pc');
}
