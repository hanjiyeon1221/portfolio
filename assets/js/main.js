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

// nav클릭시, 해당 섹션으로 이동
const navItem = document.querySelectorAll('.nav-item');
navItem.forEach(li => {
    li.addEventListener('click', function (e) {
        e.preventDefault();
        id = this.dataset.id;

        this.classList.add('on');
        navItem.forEach(other => {
            if (other !== this) {
                other.classList.remove('on');
            }
        });

        lenis.scrollTo(id);
    });
});

/* gsap */
// 로딩 카운터 모션
const items = document.querySelector('.num .data');
gsap.from(items, {
    textContent: 0,
    duration: 4,
    ease: Power1.easeIn,
    snap: { textContent: 1 },
    stagger: 1,
    onComplete: function () {
        // 끝나고 로딩모션 진행
        loadingMotion.play();
    },
    // onUpdate: textContent.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
});
const loadingMotion = gsap.timeline({
    defaults: {
        delay: 0.3,
    },
    paused: true,

    onComplete: function () {
        // 끝나고 bg모션 진행
        introMotion.play();
        navItemMotion.play();
    },
});
loadingMotion.to('.loading', {
    background: 'rgb(104, 0, 255)',
});
loadingMotion.to(
    '.loading',
    {
        'clip-path': 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    },
    '-=0.5',
);

// 메인bg 움직임
const introMotion = gsap.timeline({
    defaults: {
        delay: 1,
        opacity: 0,
        duration: 1,
    },
    paused: true,
});
introMotion.from('.holographic-bg img:nth-child(1)', { xPercent: -3, yPercent: 3 }, 'a');
introMotion.from('.holographic-bg img:nth-child(2)', { xPercent: 2, yPercent: 0 }, 'a');
introMotion.from('.holographic-bg img:nth-child(3)', { xPercent: 4, yPercent: -4 }, 'a');
introMotion.from('.holographic-bg img:nth-child(4)', { xPercent: -1, yPercent: 3 }, 'a');
introMotion.from('.holographic-bg img:nth-child(5)', { xPercent: 3, yPercent: 2 }, 'a');

// nav-item 모션
let navItemMotion = gsap.timeline({
    default: {
        delay: 0.5,
    },
    paused: true,
});

navItemMotion.from('.nav-item a', {
    y: -15,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
});
navItemMotion.from('.sc-main .title em', {
    y: -20,
    opacity: 0,
    duration: 0.7,
    stagger: 0.3,
});

// contact영역 미세 움직임
gsap.from('.sc-contact .inner', {
    scrollTrigger: {
        trigger: '.sc-contact',
        start: '0% 100%',
        end: '100% 100%',
        scrub: 0,
        // markers: true,
    },
    yPercent: -30,
});

// 영역별 nav on활성
ScrollTrigger.create({
    trigger: '.sc-main',
    start: '0% 0%',
    onEnterBack: function () {
        navItem.forEach(li => li.classList.remove('on'));
        navItem[0].classList.add('on');
    },
});
ScrollTrigger.create({
    trigger: '.sc-intro',
    start: '0% 10%',
    // markers: true,
    onEnter: function () {
        navItem.forEach(li => li.classList.remove('on'));
        navItem[1].classList.add('on');
    },
    onLeaveBack: function () {
        navItem.forEach(li => li.classList.remove('on'));
        navItem[0].classList.add('on');
    },
});
ScrollTrigger.create({
    trigger: '.sc-project',
    start: '0% 10%',
    // markers: true,
    onEnter: function () {
        navItem.forEach(li => li.classList.remove('on'));
        navItem[2].classList.add('on');
    },
    onLeaveBack: function () {
        navItem.forEach(li => li.classList.remove('on'));
        navItem[1].classList.add('on');
    },
});
ScrollTrigger.create({
    trigger: '.sc-contact',
    start: '0% 10%',
    // markers: true,
    onEnter: function () {
        navItem.forEach(li => li.classList.remove('on'));
        navItem[3].classList.add('on');
    },
    onLeaveBack: function () {
        navItem.forEach(li => li.classList.remove('on'));
        navItem[2].classList.add('on');
    },
});

// headline
// const introTl = gsap.timeline({
//     scrollTrigger: {
//         trigger: '.sc-intro',
//         start: '0% 70%',
//         // markers: true,
//     },
// });
// introTl.from('.sc-intro .headline', 0.3, {
//     y: -20,
//     opacity: 0,
// });
// introTl.from('.sc-intro .desc', 0.3, {
//     y: -20,
//     opacity: 0,
// });

// gsap.from('.sc-project .headline', {
//     y: -20,
//     opacity: 0,
//     scrollTrigger: {
//         trigger: '.sc-project',
//         start: '0% 70%',
//         markers: true,
//     },
// });
// gsap.from('.sc-subprj .headline', {
//     y: -20,
//     opacity: 0,
//     scrollTrigger: {
//         trigger: '.sc-subprj',
//         start: '0% 70%',
//         markers: true,
//     },
// });

/* index */
// 스크롤시, header
let lastScroll = 0;
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    current = this.scrollY;

    if (current > lastScroll) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
    lastScroll = current;
});

// gnb menu hover effect
let textEl = document.querySelectorAll('.nav-item a');
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

// cursor point커스텀
document.addEventListener('mousemove', function (e) {
    xVal = e.clientX;
    yVal = e.clientY;

    gsap.to('.cursor', 0.3, {
        x: xVal,
        y: yVal,
    });
});

// 특정영역에서 cursor point 확대
const cursor = document.querySelector('.cursor');
const allLink = document.querySelectorAll('a');
allLink.forEach(a => {
    a.addEventListener('mouseover', function () {
        cursor.classList.add('on');
    });
    a.addEventListener('mouseleave', function () {
        cursor.classList.remove('on');
    });
});

// current time
const clock = document.querySelector('.sc-main .date');
function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}
getClock();
setInterval(getClock, 1000);
