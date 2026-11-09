/**
 * rTechCoding Header - Animated Background Headers
 * https://finisher.co/lab/header/ 100% drop-in replacement by rTechCoding
 * Version 1.2.0 - High Visibility, Flawless Skew, Zero Clipped Gaps
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    var lib = factory();
    root.RTechCodingHeader = lib;
    root.FinisherHeader = lib; // Full drop-in backward compatibility
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function parseHex(hex) {
    if (!hex) return { r: 145, g: 56, b: 229 };
    hex = String(hex).trim();
    if (hex.indexOf('rgb') === 0) {
      var nums = hex.match(/\d+/g);
      if (nums && nums.length >= 3) {
        return { r: parseInt(nums[0], 10), g: parseInt(nums[1], 10), b: parseInt(nums[2], 10) };
      }
    }
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      var c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      var num = parseInt('0x' + c.join(''), 16);
      return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
    }
    return { r: 145, g: 56, b: 229 };
  }

  // Particle Class
  function Particle(colorHex, quadrantIndex, options) {
    this.o = options;
    this.r = parseHex(colorHex);
    this.d = Math.random() > 0.5 ? 1 : -1;
    this.h = this.getRandomShape();
    this.s = Math.abs(this.getRandomNumberInRange(this.o.size));
    this.setRandomPosition(quadrantIndex);

    var spX = this.getRandomNumberInRange(this.o.speed.x);
    var spY = this.getRandomNumberInRange(this.o.speed.y);
    this.vx = spX * (Math.random() > 0.5 ? 1 : -1);
    this.vy = spY * (Math.random() > 0.5 ? 1 : -1);
  }

  Particle.prototype.getRandomNumberInRange = function (range) {
    if (typeof range === 'number') return range;
    if (!range) return 0;
    if (range.min === range.max) return range.min;
    return Math.random() * (range.max - range.min) + range.min;
  };

  Particle.prototype.getRandomShape = function () {
    var shapes = this.o.shapes || ['c'];
    return shapes[Math.floor(Math.random() * shapes.length)] || 'c';
  };

  Particle.prototype.getQuadrantInfo = function () {
    var halfW = (this.o.c ? this.o.c.w : window.innerWidth) / 2;
    var halfH = (this.o.c ? this.o.c.h : 500) / 2;
    return {
      x: Math.random() * halfW,
      y: Math.random() * halfH,
      halfWidth: halfW,
      halfHeight: halfH
    };
  };

  Particle.prototype.setRandomPosition = function (qIndex) {
    var q = this.getQuadrantInfo();
    if (qIndex === 3) {
      this.x = q.x + q.halfWidth;
      this.y = q.y;
    } else if (qIndex === 2) {
      this.x = q.x;
      this.y = q.y + q.halfHeight;
    } else if (qIndex === 1) {
      this.x = q.x + q.halfWidth;
      this.y = q.y + q.halfHeight;
    } else {
      this.x = q.x;
      this.y = q.y;
    }
  };

  Particle.prototype.rgbaString = function (rgb, alpha) {
    return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + alpha + ')';
  };

  Particle.prototype.animate = function (ctx, width, height) {
    // Pulse Size
    if (this.o.size.pulse) {
      this.s += this.o.size.pulse * this.d;
      if (this.s > this.o.size.max || this.s < this.o.size.min) {
        this.d *= -1;
      }
      this.s = Math.abs(this.s);
    }

    // Movement
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges smoothly
    if (this.x < 0) {
      this.vx *= -1;
      this.x += 1;
    } else if (this.x > width) {
      this.vx *= -1;
      this.x -= 1;
    }

    if (this.y < 0) {
      this.vy *= -1;
      this.y += 1;
    } else if (this.y > height) {
      this.vy *= -1;
      this.y -= 1;
    }

    ctx.beginPath();
    if (this.o.blending && this.o.blending !== 'none' && this.o.blending !== 'normal') {
      ctx.globalCompositeOperation = this.o.blending;
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }

    var colorCenter = this.rgbaString(this.r, this.o.opacity.center);
    var colorEdge = this.rgbaString(this.r, this.o.opacity.edge);

    var radius = 'c' === this.h ? this.s / 2 : ('t' === this.h ? 0.577 * this.s : ('s' === this.h ? 0.707 * this.s : this.s));
    radius = Math.max(0.1, radius);

    var grad = ctx.createRadialGradient(this.x, this.y, 0.01, this.x, this.y, radius);
    grad.addColorStop(0, colorCenter);
    grad.addColorStop(1, colorEdge);
    ctx.fillStyle = grad;

    var halfS = Math.abs(this.s / 2);

    if (this.h === 'c') {
      // Circle
      ctx.arc(this.x, this.y, halfS, 0, Math.PI * 2, false);
    } else if (this.h === 's') {
      // Square
      var left = this.x - halfS;
      var right = this.x + halfS;
      var top = this.y - halfS;
      var bottom = this.y + halfS;
      ctx.moveTo(left, bottom);
      ctx.lineTo(right, bottom);
      ctx.lineTo(right, top);
      ctx.lineTo(left, top);
    } else if (this.h === 't') {
      // Triangle
      var v = Math.ceil(halfS * Math.tan(30 * 0.017453));
      var g = this.y + v;
      ctx.moveTo(this.x - halfS, g);
      ctx.lineTo(this.x + halfS, g);
      ctx.lineTo(this.x, this.y - 2 * v);
    }

    ctx.closePath();
    ctx.fill();
  };

  // Main Header Class
  function RTechCodingHeader(userOptions) {
    var self = this;
    this.options = userOptions || {};
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.id = 'rtechcoding-canvas';
    this.canvas.className = 'rtechcoding-canvas finisher-canvas';

    this.container = this.resolveContainer(this.options.className, this.options.element);
    
    // Clean any prior canvas in container
    var prior = this.container.querySelectorAll('#rtechcoding-canvas, #finisher-canvas, .finisher-canvas');
    for (var p = 0; p < prior.length; p++) {
      prior[p].parentNode.removeChild(prior[p]);
    }

    // Insert canvas as first child
    this.container.insertBefore(this.canvas, this.container.firstChild);

    this.particles = [];
    this.animating = true;
    this.resizeTimer = null;

    this.boundResize = function () {
      clearTimeout(self.resizeTimer);
      self.resizeTimer = setTimeout(self.resize.bind(self), 100);
    };

    window.addEventListener('resize', this.boundResize, false);

    this.init(this.options);
    requestAnimationFrame(this.animate.bind(this));
  }

  RTechCodingHeader.prototype.resolveContainer = function (className, element) {
    if (element) {
      if (typeof element === 'string') {
        var el = document.querySelector(element);
        if (el) return el;
      } else if (element instanceof HTMLElement) {
        return element;
      }
    }
    var targets = document.getElementsByClassName(className || 'finisher-header');
    if (!targets.length) {
      targets = document.getElementsByClassName('rtechcoding-header');
    }
    if (!targets.length) {
      throw new Error('No .finisher-header or .rtechcoding-header container found.');
    }
    return targets[0];
  };

  RTechCodingHeader.prototype.init = function (options) {
    this.options = options || {};
    var bgHex = this.options.colors.background || '#9138e5';
    this.bc = parseHex(bgHex);

    // Ensure container creates its own stacking context and has solid background
    this.container.style.position = 'relative';
    this.container.style.isolation = 'isolate';
    this.container.style.backgroundColor = bgHex;
    this.container.style.overflow = 'hidden';

    this.particles = [];
    this.resize();
    this.createParticles();
  };

  RTechCodingHeader.prototype.resize = function () {
    if (!this.container || !this.canvas) return;
    var w = this.container.clientWidth || window.innerWidth;
    var h = this.container.clientHeight || 580;
    this.options.c = { w: w, h: h };
    this.canvas.width = w;
    this.canvas.height = h;

    var skewVal = parseFloat(this.options.skew) || 0;

    // Apply clean skew using clip-path (flush at top, perfectly slanted at bottom)
    if (skewVal !== 0) {
      var s = Math.ceil(Math.tan(Math.abs(skewVal) * Math.PI / 180) * w);
      if (skewVal < 0) {
        // Slanted up to the right (classic Stripe / Finisher look)
        this.container.style.clipPath = 'polygon(0 0, 100% 0, 100% calc(100% - ' + s + 'px), 0 100%)';
        this.container.style.webkitClipPath = 'polygon(0 0, 100% 0, 100% calc(100% - ' + s + 'px), 0 100%)';
      } else {
        // Slanted down to the right
        this.container.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - ' + s + 'px))';
        this.container.style.webkitClipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - ' + s + 'px))';
      }
    } else {
      this.container.style.clipPath = 'none';
      this.container.style.webkitClipPath = 'none';
    }

    // Canvas positioning: perfectly filling the container at z-index: 0
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.backgroundColor = 'transparent';
  };

  RTechCodingHeader.prototype.createParticles = function () {
    var colorIndex = 0;
    this.particles = [];
    var totalCount = this.options.count || 6;
    
    // Optimize count on mobile
    if (window.innerWidth < 600 && totalCount > 5) {
      this.actualCount = Math.round(totalCount / 2);
    } else {
      this.actualCount = totalCount;
    }

    var colors = this.options.colors.particles || ['#6bd6ff', '#ffcb57', '#ff333d'];

    for (var i = 0; i < this.actualCount; i++) {
      var quadrant = i % 4;
      var p = new Particle(colors[colorIndex], quadrant, this.options);
      colorIndex++;
      if (colorIndex >= colors.length) {
        colorIndex = 0;
      }
      this.particles[i] = p;
    }
  };

  RTechCodingHeader.prototype.animate = function () {
    if (!this.animating || !this.ctx || !this.canvas) return;

    // Clear frame
    this.ctx.clearRect(0, 0, this.options.c.w, this.options.c.h);

    for (var i = 0; i < this.actualCount; i++) {
      if (this.particles[i]) {
        this.particles[i].animate(this.ctx, this.options.c.w, this.options.c.h);
      }
    }

    requestAnimationFrame(this.animate.bind(this));
  };

  RTechCodingHeader.prototype.update = function (newOptions) {
    this.init(newOptions);
  };

  RTechCodingHeader.prototype.destroy = function () {
    this.animating = false;
    window.removeEventListener('resize', this.boundResize);
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
  };

  return RTechCodingHeader;
});
