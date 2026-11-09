/**
 * rTechCoding Animated Background Headers - Lab Application Controller
 * Replaces and extends finisher.co/lab/header
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var PRESETS = {
    vibrant: {
      count: 6,
      size: { min: 1100, max: 1300, pulse: 0 },
      speed: { x: { min: 0.1, max: 0.3 }, y: { min: 0.1, max: 0.3 } },
      colors: {
        background: '#9138e5',
        particles: ['#6bd6ff', '#ffcb57', '#ff333d']
      },
      blending: 'overlay',
      opacity: { center: 1, edge: 0.1 },
      skew: -2,
      shapes: ['c']
    },
    rtechcyber: {
      count: 7,
      size: { min: 1000, max: 1400, pulse: 0.25 },
      speed: { x: { min: 0.15, max: 0.35 }, y: { min: 0.15, max: 0.35 } },
      colors: {
        background: '#050918',
        particles: ['#00E5FF', '#2878FF', '#B323FF', '#00FFA3']
      },
      blending: 'screen',
      opacity: { center: 0.9, edge: 0.05 },
      skew: -2,
      shapes: ['c']
    },
    night: {
      count: 8,
      size: { min: 900, max: 1500, pulse: 0.1 },
      speed: { x: { min: 0.1, max: 0.4 }, y: { min: 0.1, max: 0.4 } },
      colors: {
        background: '#080c18',
        particles: ['#142850', '#27496d', '#0c7b93', '#00a8cc']
      },
      blending: 'screen',
      opacity: { center: 0.8, edge: 0 },
      skew: -2,
      shapes: ['c']
    },
    subtle: {
      count: 4,
      size: { min: 1200, max: 1600, pulse: 0 },
      speed: { x: { min: 0.05, max: 0.15 }, y: { min: 0.05, max: 0.15 } },
      colors: {
        background: '#0b0f19',
        particles: ['#1f2937', '#374151', '#2563eb']
      },
      blending: 'lighten',
      opacity: { center: 0.5, edge: 0 },
      skew: -2,
      shapes: ['c']
    },
    smooth: {
      count: 5,
      size: { min: 800, max: 1200, pulse: 0.2 },
      speed: { x: { min: 0.1, max: 0.25 }, y: { min: 0.1, max: 0.25 } },
      colors: {
        background: '#1e1b4b',
        particles: ['#818cf8', '#c084fc', '#f472b6']
      },
      blending: 'screen',
      opacity: { center: 0.7, edge: 0.05 },
      skew: -2,
      shapes: ['c']
    },
    bubbles: {
      count: 25,
      size: { min: 30, max: 80, pulse: 0.5 },
      speed: { x: { min: 0.2, max: 0.8 }, y: { min: 0.3, max: 1.1 } },
      colors: {
        background: '#0f172a',
        particles: ['#38bdf8', '#818cf8', '#34d399', '#f43f5e']
      },
      blending: 'screen',
      opacity: { center: 0.85, edge: 0.15 },
      skew: 0,
      shapes: ['c', 's', 't']
    },
    professional: {
      count: 5,
      size: { min: 1000, max: 1400, pulse: 0 },
      speed: { x: { min: 0.1, max: 0.2 }, y: { min: 0.1, max: 0.2 } },
      colors: {
        background: '#0f172a',
        particles: ['#1e3a8a', '#0284c7', '#0d9488']
      },
      blending: 'overlay',
      opacity: { center: 0.85, edge: 0.05 },
      skew: -2,
      shapes: ['c']
    },
    summer: {
      count: 6,
      size: { min: 900, max: 1300, pulse: 0.1 },
      speed: { x: { min: 0.15, max: 0.35 }, y: { min: 0.1, max: 0.3 } },
      colors: {
        background: '#4c0519',
        particles: ['#f43f5e', '#fb923c', '#fde047']
      },
      blending: 'screen',
      opacity: { center: 0.9, edge: 0.1 },
      skew: -2,
      shapes: ['c']
    },
    parallax: {
      count: 9,
      size: { min: 600, max: 1400, pulse: 0.3 },
      speed: { x: { min: 0.2, max: 0.6 }, y: { min: 0.2, max: 0.6 } },
      colors: {
        background: '#18181b',
        particles: ['#a855f7', '#ec4899', '#3b82f6', '#06b6d4']
      },
      blending: 'color-dodge',
      opacity: { center: 0.6, edge: 0 },
      skew: -2,
      shapes: ['c', 's']
    },
    universe: {
      count: 10,
      size: { min: 500, max: 1200, pulse: 0.35 },
      speed: { x: { min: 0.1, max: 0.45 }, y: { min: 0.1, max: 0.45 } },
      colors: {
        background: '#030712',
        particles: ['#4f46e5', '#7c3aed', '#db2777', '#22d3ee']
      },
      blending: 'screen',
      opacity: { center: 0.8, edge: 0.05 },
      skew: 0,
      shapes: ['c', 't']
    }
  };

  // State
  var currentPreset = 'vibrant';
  var state = JSON.parse(JSON.stringify(PRESETS[currentPreset]));
  var headerInstance = null;

  // DOM Elements
  var dom = {
    mainHeader: document.getElementById('mainHeader'),
    presetsBar: document.getElementById('presetsBar'),
    btnRandomize: document.getElementById('btnRandomize'),
    btnReset: document.getElementById('btnReset'),
    btnHowToUse: document.getElementById('btnHowToUse'),
    btnGetCode: document.getElementById('btnGetCode'),
    topNavHowToUse: document.getElementById('topNavHowToUse'),
    topNavGetCode: document.getElementById('topNavGetCode'),

    // Inputs
    paramCount: document.getElementById('paramCount'),
    valCount: document.getElementById('valCount'),
    paramSizeMin: document.getElementById('paramSizeMin'),
    valSizeMin: document.getElementById('valSizeMin'),
    paramSizeMax: document.getElementById('paramSizeMax'),
    valSizeMax: document.getElementById('valSizeMax'),
    paramPulse: document.getElementById('paramPulse'),
    valPulse: document.getElementById('valPulse'),
    paramSpeedXMin: document.getElementById('paramSpeedXMin'),
    paramSpeedXMax: document.getElementById('paramSpeedXMax'),
    valSpeedX: document.getElementById('valSpeedX'),
    paramSpeedYMin: document.getElementById('paramSpeedYMin'),
    paramSpeedYMax: document.getElementById('paramSpeedYMax'),
    valSpeedY: document.getElementById('valSpeedY'),

    // Colors
    bgSwatchPreview: document.getElementById('bgSwatchPreview'),
    paramBgColor: document.getElementById('paramBgColor'),
    paramBgColorText: document.getElementById('paramBgColorText'),
    btnAddColor: document.getElementById('btnAddColor'),
    particleColorsList: document.getElementById('particleColorsList'),

    // Shapes
    shapesGroup: document.getElementById('shapesGroup'),

    // Blending & Opacity & Skew
    paramBlending: document.getElementById('paramBlending'),
    paramOpacityCenter: document.getElementById('paramOpacityCenter'),
    valOpacityCenter: document.getElementById('valOpacityCenter'),
    paramOpacityEdge: document.getElementById('paramOpacityEdge'),
    valOpacityEdge: document.getElementById('valOpacityEdge'),
    paramSkew: document.getElementById('paramSkew'),
    valSkew: document.getElementById('valSkew'),

    // Modal elements
    howToUseModal: document.getElementById('howToUseModal'),
    btnCloseModal: document.getElementById('btnCloseModal'),
    btnModalCloseAction: document.getElementById('btnModalCloseAction'),
    step3Code: document.getElementById('step3Code'),
    btnCopyStep3: document.getElementById('btnCopyStep3'),
    btnCopyFullSnippet: document.getElementById('btnCopyFullSnippet'),
    toast: document.getElementById('appToast')
  };

  // Initialize Header
  function initHeader() {
    if (headerInstance) {
      headerInstance.destroy();
    }
    headerInstance = new window.RTechCodingHeader({
      element: dom.mainHeader,
      count: state.count,
      size: state.size,
      speed: state.speed,
      colors: state.colors,
      blending: state.blending,
      opacity: state.opacity,
      skew: state.skew,
      shapes: state.shapes
    });
    updateLiveCode();
  }

  // Sync Form Controls with `state`
  function syncForm() {
    dom.paramCount.value = state.count;
    dom.valCount.textContent = state.count;

    dom.paramSizeMin.value = state.size.min;
    dom.valSizeMin.textContent = state.size.min + ' px';

    dom.paramSizeMax.value = state.size.max;
    dom.valSizeMax.textContent = state.size.max + ' px';

    dom.paramPulse.value = state.size.pulse;
    dom.valPulse.textContent = Number(state.size.pulse).toFixed(2);

    dom.paramSpeedXMin.value = state.speed.x.min;
    dom.paramSpeedXMax.value = state.speed.x.max;
    dom.valSpeedX.textContent = state.speed.x.min.toFixed(2) + ' - ' + state.speed.x.max.toFixed(2);

    dom.paramSpeedYMin.value = state.speed.y.min;
    dom.paramSpeedYMax.value = state.speed.y.max;
    dom.valSpeedY.textContent = state.speed.y.min.toFixed(2) + ' - ' + state.speed.y.max.toFixed(2);

    dom.paramBgColor.value = state.colors.background;
    dom.paramBgColorText.value = state.colors.background.toUpperCase();
    dom.bgSwatchPreview.style.backgroundColor = state.colors.background;

    renderParticleColors();

    // Shapes
    var shapeBtns = dom.shapesGroup.querySelectorAll('.shape-toggle-card, .btn-toggle-item');
    shapeBtns.forEach(function (btn) {
      var s = btn.getAttribute('data-shape');
      btn.classList.toggle('active', state.shapes.indexOf(s) !== -1);
    });

    dom.paramBlending.value = state.blending;

    dom.paramOpacityCenter.value = state.opacity.center;
    dom.valOpacityCenter.textContent = Number(state.opacity.center).toFixed(2);

    dom.paramOpacityEdge.value = state.opacity.edge;
    dom.valOpacityEdge.textContent = Number(state.opacity.edge).toFixed(2);

    dom.paramSkew.value = state.skew;
    dom.valSkew.textContent = state.skew + '°';

    // Skew chips sync
    document.querySelectorAll('.chip-btn').forEach(function (chip) {
      chip.classList.toggle('active', parseFloat(chip.getAttribute('data-skew')) === state.skew);
    });
  }

  // Render Particle Colors List
  function renderParticleColors() {
    dom.particleColorsList.innerHTML = '';
    state.colors.particles.forEach(function (color, index) {
      var row = document.createElement('div');
      row.className = 'swatch-row';
      row.innerHTML = 
        '<div class="swatch">' +
          '<div class="swatch-preview" style="background-color: ' + color + ';">' +
            '<input type="color" data-index="' + index + '" value="' + color + '">' +
          '</div>' +
          '<input type="text" class="color-hex-text" data-index="' + index + '" value="' + color.toUpperCase() + '">' +
        '</div>' +
        (state.colors.particles.length > 1 
          ? '<button class="btn-del-swatch" data-index="' + index + '" title="Remove">&times;</button>' 
          : '');

      var colorPicker = row.querySelector('input[type="color"]');
      var colorText = row.querySelector('.color-hex-text');
      var delBtn = row.querySelector('.btn-del-swatch');
      var preview = row.querySelector('.swatch-preview');

      colorPicker.addEventListener('input', function (e) {
        var val = e.target.value;
        preview.style.backgroundColor = val;
        colorText.value = val.toUpperCase();
        state.colors.particles[index] = val;
        onConfigChanged();
      });

      colorText.addEventListener('change', function (e) {
        var val = e.target.value.trim();
        if (!val.startsWith('#')) val = '#' + val;
        preview.style.backgroundColor = val;
        colorPicker.value = val;
        state.colors.particles[index] = val;
        onConfigChanged();
      });

      if (delBtn) {
        delBtn.addEventListener('click', function () {
          state.colors.particles.splice(index, 1);
          renderParticleColors();
          onConfigChanged();
        });
      }

      dom.particleColorsList.appendChild(row);
    });
  }

  // Triggered when controls update
  function onConfigChanged() {
    if (headerInstance) {
      headerInstance.update(state);
    }
    updateLiveCode();
  }

  function getConfigObject() {
    return {
      count: state.count,
      size: state.size,
      speed: state.speed,
      colors: state.colors,
      blending: state.blending,
      opacity: state.opacity,
      skew: state.skew,
      shapes: state.shapes
    };
  }

  // Update Live Code in Step 3
  function updateLiveCode() {
    var configObj = getConfigObject();
    var formattedJson = JSON.stringify(configObj, null, 2);

    var codeSnippet = 
'<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span>\n' +
'  <span class="hljs-keyword">new</span> <span class="hljs-title">FinisherHeader</span>(' + syntaxHighlightJson(formattedJson) + ');\n' +
'<span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>';

    if (dom.step3Code) {
      dom.step3Code.innerHTML = '<code>' + codeSnippet + '</code>';
    }
  }

  function syntaxHighlightJson(json) {
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'hljs-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'hljs-attr';
        } else {
          cls = 'hljs-string';
        }
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  function getRawScriptTagCode() {
    var configObj = getConfigObject();
    return (
'<!-- 1. Container -->\n' +
'<div class="header finisher-header" style="width: 100%; height: 350px;">\n' +
'  <!-- Your logo, navigation, or hero content -->\n' +
'</div>\n\n' +
'<!-- 2. Library Script -->\n' +
'<script src="rtechcoding-header.js" type="text/javascript"></script>\n\n' +
'<!-- 3. Initialization -->\n' +
'<script type="text/javascript">\n' +
'  new FinisherHeader(' + JSON.stringify(configObj, null, 2) + ');\n' +
'</script>'
    );
  }

  // Switch Preset
  function applyPreset(name) {
    if (!PRESETS[name]) return;
    currentPreset = name;
    state = JSON.parse(JSON.stringify(PRESETS[name]));

    // Update active class in presets bar
    var toggles = dom.presetsBar.querySelectorAll('.toggle');
    toggles.forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-preset') === name);
    });

    syncForm();
    initHeader();
  }

  // Open & Close Modal
  function openModal() {
    updateLiveCode();
    dom.howToUseModal.classList.add('open');
  }

  function closeModal() {
    dom.howToUseModal.classList.remove('open');
  }

  // Bind Events
  function bindEvents() {
    // Presets bar clicks
    dom.presetsBar.querySelectorAll('.toggle').forEach(function (t) {
      t.addEventListener('click', function () {
        applyPreset(t.getAttribute('data-preset'));
      });
    });

    // Count
    dom.paramCount.addEventListener('input', function (e) {
      state.count = parseInt(e.target.value, 10);
      dom.valCount.textContent = state.count;
      onConfigChanged();
    });

    // Size Min
    dom.paramSizeMin.addEventListener('input', function (e) {
      state.size.min = parseInt(e.target.value, 10);
      dom.valSizeMin.textContent = state.size.min + ' px';
      onConfigChanged();
    });

    // Size Max
    dom.paramSizeMax.addEventListener('input', function (e) {
      state.size.max = parseInt(e.target.value, 10);
      dom.valSizeMax.textContent = state.size.max + ' px';
      onConfigChanged();
    });

    // Pulse
    dom.paramPulse.addEventListener('input', function (e) {
      state.size.pulse = parseFloat(e.target.value);
      dom.valPulse.textContent = state.size.pulse.toFixed(2);
      onConfigChanged();
    });

    // Speed X
    dom.paramSpeedXMin.addEventListener('input', function (e) {
      state.speed.x.min = parseFloat(e.target.value);
      dom.valSpeedX.textContent = state.speed.x.min.toFixed(2) + ' - ' + state.speed.x.max.toFixed(2);
      onConfigChanged();
    });
    dom.paramSpeedXMax.addEventListener('input', function (e) {
      state.speed.x.max = parseFloat(e.target.value);
      dom.valSpeedX.textContent = state.speed.x.min.toFixed(2) + ' - ' + state.speed.x.max.toFixed(2);
      onConfigChanged();
    });

    // Speed Y
    dom.paramSpeedYMin.addEventListener('input', function (e) {
      state.speed.y.min = parseFloat(e.target.value);
      dom.valSpeedY.textContent = state.speed.y.min.toFixed(2) + ' - ' + state.speed.y.max.toFixed(2);
      onConfigChanged();
    });
    dom.paramSpeedYMax.addEventListener('input', function (e) {
      state.speed.y.max = parseFloat(e.target.value);
      dom.valSpeedY.textContent = state.speed.y.min.toFixed(2) + ' - ' + state.speed.y.max.toFixed(2);
      onConfigChanged();
    });

    // Background color
    dom.paramBgColor.addEventListener('input', function (e) {
      var val = e.target.value;
      dom.bgSwatchPreview.style.backgroundColor = val;
      dom.paramBgColorText.value = val.toUpperCase();
      state.colors.background = val;
      onConfigChanged();
    });
    dom.paramBgColorText.addEventListener('change', function (e) {
      var val = e.target.value.trim();
      if (!val.startsWith('#')) val = '#' + val;
      dom.bgSwatchPreview.style.backgroundColor = val;
      dom.paramBgColor.value = val;
      state.colors.background = val;
      onConfigChanged();
    });

    // Add Color
    dom.btnAddColor.addEventListener('click', function () {
      var palette = ['#00E5FF', '#2878FF', '#B323FF', '#FF0055', '#FFB800', '#00FF66', '#00F0FF', '#FF5500'];
      var rand = palette[Math.floor(Math.random() * palette.length)];
      state.colors.particles.push(rand);
      renderParticleColors();
      onConfigChanged();
    });

    // Shapes
    dom.shapesGroup.querySelectorAll('.shape-toggle-card, .btn-toggle-item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var shape = btn.getAttribute('data-shape');
        var idx = state.shapes.indexOf(shape);
        if (idx !== -1) {
          if (state.shapes.length > 1) {
            state.shapes.splice(idx, 1);
            btn.classList.remove('active');
          }
        } else {
          state.shapes.push(shape);
          btn.classList.add('active');
        }
        onConfigChanged();
      });
    });

    // Blending
    dom.paramBlending.addEventListener('change', function (e) {
      state.blending = e.target.value;
      onConfigChanged();
    });

    // Opacity
    dom.paramOpacityCenter.addEventListener('input', function (e) {
      state.opacity.center = parseFloat(e.target.value);
      dom.valOpacityCenter.textContent = state.opacity.center.toFixed(2);
      onConfigChanged();
    });
    dom.paramOpacityEdge.addEventListener('input', function (e) {
      state.opacity.edge = parseFloat(e.target.value);
      dom.valOpacityEdge.textContent = state.opacity.edge.toFixed(2);
      onConfigChanged();
    });

    // Skew Slider
    dom.paramSkew.addEventListener('input', function (e) {
      state.skew = parseFloat(e.target.value);
      dom.valSkew.textContent = state.skew + '°';
      document.querySelectorAll('.chip-btn').forEach(function (chip) {
        chip.classList.toggle('active', parseFloat(chip.getAttribute('data-skew')) === state.skew);
      });
      onConfigChanged();
    });

    // Skew Quick Chips
    document.querySelectorAll('.chip-btn[data-skew]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var s = parseFloat(chip.getAttribute('data-skew'));
        state.skew = s;
        dom.paramSkew.value = s;
        dom.valSkew.textContent = s + '°';
        document.querySelectorAll('.chip-btn').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        onConfigChanged();
      });
    });

    // Randomize
    dom.btnRandomize.addEventListener('click', function () {
      var palettes = [
        ['#6bd6ff', '#ffcb57', '#ff333d'],
        ['#00E5FF', '#2878FF', '#B323FF', '#00FFA3'],
        ['#142850', '#27496d', '#0c7b93', '#00a8cc'],
        ['#818cf8', '#c084fc', '#f472b6'],
        ['#f43f5e', '#fb923c', '#fde047'],
        ['#a855f7', '#ec4899', '#3b82f6', '#06b6d4'],
        ['#10b981', '#34d399', '#06b6d4']
      ];
      var backgrounds = ['#9138e5', '#050918', '#080c18', '#0b0f19', '#1e1b4b', '#0f172a', '#4c0519', '#18181b', '#022c22'];
      var blends = ['overlay', 'screen', 'lighten', 'color-dodge', 'soft-light'];

      state.count = Math.floor(Math.random() * 8) + 4;
      state.size.min = Math.floor(Math.random() * 500) + 700;
      state.size.max = state.size.min + Math.floor(Math.random() * 400) + 150;
      state.size.pulse = parseFloat((Math.random() * 0.35).toFixed(2));
      state.speed.x.min = parseFloat((Math.random() * 0.15 + 0.05).toFixed(2));
      state.speed.x.max = parseFloat((state.speed.x.min + Math.random() * 0.25 + 0.1).toFixed(2));
      state.speed.y.min = parseFloat((Math.random() * 0.15 + 0.05).toFixed(2));
      state.speed.y.max = parseFloat((state.speed.y.min + Math.random() * 0.25 + 0.1).toFixed(2));
      state.colors.background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
      state.colors.particles = palettes[Math.floor(Math.random() * palettes.length)];
      state.blending = blends[Math.floor(Math.random() * blends.length)];
      state.opacity.center = parseFloat((Math.random() * 0.3 + 0.7).toFixed(2));
      state.opacity.edge = parseFloat((Math.random() * 0.1).toFixed(2));
      state.skew = (Math.floor(Math.random() * 7) - 3);

      dom.presetsBar.querySelectorAll('.toggle').forEach(function (t) { t.classList.remove('active'); });

      syncForm();
      initHeader();
      showToast('Randomized configuration applied!');
    });

    // Reset
    dom.btnReset.addEventListener('click', function () {
      applyPreset('vibrant');
      showToast('Reset to Vibrant preset');
    });

    // "How to use" and "Get Code" open the popup modal
    dom.btnHowToUse.addEventListener('click', openModal);
    dom.btnGetCode.addEventListener('click', openModal);
    dom.topNavHowToUse.addEventListener('click', openModal);
    dom.topNavGetCode.addEventListener('click', openModal);

    // Modal Close
    dom.btnCloseModal.addEventListener('click', closeModal);
    dom.btnModalCloseAction.addEventListener('click', closeModal);

    dom.howToUseModal.addEventListener('click', function (e) {
      if (e.target === dom.howToUseModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dom.howToUseModal.classList.contains('open')) {
        closeModal();
      }
    });

    // Copy Step 3
    dom.btnCopyStep3.addEventListener('click', function () {
      var configObj = getConfigObject();
      var snippet = '<script type="text/javascript">\n  new FinisherHeader(' + JSON.stringify(configObj, null, 2) + ');\n</script>';
      copyToClipboard(snippet);
    });

    // Copy Full Snippet
    dom.btnCopyFullSnippet.addEventListener('click', function () {
      copyToClipboard(getRawScriptTagCode());
    });
  }

  // Copy helper
  window.copySnippetText = function (btn, elementId) {
    var el = document.getElementById(elementId);
    if (!el) return;
    copyToClipboard(el.textContent.trim());
  };

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast('Code copied to clipboard!');
      });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showToast('Code copied to clipboard!');
      } catch (err) {
        alert('Could not copy automatically.');
      }
      document.body.removeChild(ta);
    }
  }

  function showToast(msg) {
    dom.toast.textContent = msg;
    dom.toast.classList.add('show');
    setTimeout(function () {
      dom.toast.classList.remove('show');
    }, 2200);
  }

  // Initial Run
  syncForm();
  initHeader();
  bindEvents();
});
