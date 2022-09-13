'use strict';

// declare shortcut function
function $(selector) { return document.querySelector(selector); }
function byId(id) { return document.getElementById(id); }
// eslint-disable-next-line no-unused-vars
function _(tag) { return document.createElement(tag); }


const images = ['salmon-cookies-screenshot.png', 'gitris-screenshot.png'];

function createHero(images) {
  const div = $('.hero-graphics');
  images.forEach(element => {
    const canvas = _('canvas');
    canvas.width = '800';
    canvas.height = '500';
    const width = canvas.width;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;
      const aspect = imgHeight / imgWidth;
      ctx.drawImage(img, 0, 40, width, width * aspect);
    };
    img.src = `./images/${element}`;

    ctx.fillStyle = 'mediumpurple';
    ctx.fillRect(0, 0, width, 40);
    console.log(width);
    ctx.beginPath();
    ctx.fillStyle = 'tomato';
    ctx.ellipse(16, 20, 6, 6, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'gold';
    ctx.ellipse(34, 20, 6, 6, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'limegreen';
    ctx.ellipse(52, 20, 6, 6, 0, 0, 2 * Math.PI);
    ctx.fill();

    div.append(canvas);
  });
}

createHero(images);
