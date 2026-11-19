// ============================================================================
// 0. OFFICIAL GAMEPLAY TRAILER & 5-ACT CINEMATIC REEL CATALOG
// ============================================================================
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/JaredAsiong/Strike-of-Destiny/main";

const TRAILER_CHAPTERS = [
  {
    actTag: "FEATURED • OFFICIAL GAMEPLAY TRAILER",
    title: "Strike of Destiny — Official Gameplay Showcase",
    kicker: "OFFICIAL GAMEPLAY TRAILER • ACTION ROGUELIKE SURVIVOR",
    sub: `"Survive relentless undead waves, evolve Mythic weapons, and conquer World Bosses!"`,
    video: "assets/videos/gameplay_trailer.mp4",
    altFiles: ["gameplay_trailer.mp4", "Recording 2026-11-17 165513 (1).mp4"],
    poster: "assets/portraits/the_lich_portrait.png",
    color: "#ff2a38",
    heroKey: null
  },
  {
    actTag: "ACT I • HERO ORIGIN TRAILER",
    title: "Kaito — The Shadow Shinobi",
    kicker: "SHADOW SHINOBI • STARTING WEAPON: CLICK KUNAI & SHURIKENS",
    sub: `"A disciplined ninja from the hidden village who dances through undead hordes with lightning-fast blades and phantom dodges."`,
    video: "assets/videos/kaito_intro.mp4",
    altFiles: ["kaito_intro.mp4"],
    poster: "assets/portraits/hero_portrait.png",
    color: "#33e6ff",
    heroKey: "shinobi"
  },
  {
    actTag: "ACT II • HERO ORIGIN TRAILER",
    title: "Sir Gareth — The Iron Paladin",
    kicker: "IRON PALADIN • STARTING WEAPON: SHORTSWORDS & AEGIS SHIELD",
    sub: `"An armored bastion of the Sacred Citadel, clad in heavy tempered plate steel that crushes oncoming swarms."`,
    video: "assets/videos/paladin_intro.mp4",
    altFiles: ["paladin_intro.mp4"],
    poster: "assets/portraits/iron_paladin_portrait.png",
    color: "#ffd940",
    heroKey: "paladin"
  },
  {
    actTag: "ACT III • HERO ORIGIN TRAILER",
    title: "Doctor Vex — The Plague Alchemist",
    kicker: "PLAGUE ALCHEMIST • STARTING WEAPON: POTION VIALS & TOXIC MIST",
    sub: `"A renegade apothecary whose volatile chemical concoctions melt flesh and bone into bubbling emerald vapor."`,
    video: "assets/videos/alchemist_intro.mp4",
    altFiles: ["alchemist_intro.mp4"],
    poster: "assets/portraits/plague_alchemist_portrait.png",
    color: "#4dff73",
    heroKey: "alchemist"
  },
  {
    actTag: "ACT IV • HERO ORIGIN TRAILER",
    title: "Zephyr — The Storm Warden",
    kicker: "STORM WARDEN • STARTING WEAPON: ELECTRIC PLASMA BALLS & THUNDER",
    sub: `"A storm-channeling battle mage whose presence crackles with electric arcs that fry clusters of ghouls from above."`,
    video: "assets/videos/warden_intro.mp4",
    altFiles: ["warden_intro.mp4"],
    poster: "assets/portraits/storm_warden_portrait.png",
    color: "#59bfff",
    heroKey: "warden"
  },
  {
    actTag: "CLIMAX • SECRET WORLD BOSS REVEAL",
    title: "Ryan Jacob Solomon — High-Roller Gambler",
    kicker: "SPECIAL SECRET LEVEL BOSS • 10,000 HP CASINO & VALORANT DOMAIN",
    sub: `"Fueled by slot-machine scatters, flying banknotes, and Night Market knife bundles—enter his VIP Casino Domain if you dare!"`,
    video: "assets/videos/ryan_intro.mp4",
    altFiles: ["ryan_intro.mp4"],
    poster: "assets/portraits/jared_boss_portrait.png",
    color: "#ff2a38",
    heroKey: null
  }
];

let currentTrailerIndex = 0;
let currentVideoCandidates = [];
let currentCandidateIdx = 0;
let pendingAutoPlay = false;

function buildVideoCandidates(ch) {
  const candidates = [ch.video];
  const files = ch.altFiles || [ch.video.split("/").pop()];
  for (const f of files) {
    if (!candidates.includes(`assets/videos/${f}`)) candidates.push(`assets/videos/${f}`);
    if (!candidates.includes(f)) candidates.push(f);
  }
  for (const f of files) {
    candidates.push(`${GITHUB_RAW_BASE}/assets/videos/${encodeURIComponent(f)}`);
    candidates.push(`${GITHUB_RAW_BASE}/${encodeURIComponent(f)}`);
  }
  return candidates;
}

function loadTrailerChapter(index, autoPlay = true) {
  const ch = TRAILER_CHAPTERS[index];
  if (!ch) return;
  currentTrailerIndex = index;

  document.querySelectorAll(".chapter-btn").forEach((btn, idx) => {
    btn.classList.toggle("active", idx === index);
  });

  document.getElementById("trailerActTag").textContent = ch.actTag;
  document.getElementById("trailerTitleText").textContent = ch.title;

  const lt = document.getElementById("trailerLowerThird");
  lt.style.borderLeftColor = ch.color;
  document.getElementById("ltKicker").textContent = ch.kicker;
  document.getElementById("ltKicker").style.color = ch.color;
  document.getElementById("ltHeading").textContent = ch.title;
  document.getElementById("ltSub").textContent = ch.sub;

  const videoEl = document.getElementById("mainTrailerVideo");
  videoEl.poster = ch.poster;

  currentVideoCandidates = buildVideoCandidates(ch);
  currentCandidateIdx = 0;
  pendingAutoPlay = autoPlay;

  videoEl.src = currentVideoCandidates[0];
  videoEl.load();

  if (autoPlay) {
    videoEl.play().catch(() => {});
  }
}

// ============================================================================
// 1. HEROES & LORE CATALOG
// ============================================================================
const HERO_DATA = {
  shinobi: {
    nameHeading: "Kaito — The Shadow Shinobi",
    titleBadge: "SHADOW SHINOBI",
    kicker: "AGILITY & PRECISION ASSASSIN",
    color: "#33e6ff",
    portrait: "assets/portraits/hero_portrait.png",
    spriteClass: "sprite-shinobi",
    weaponName: "Click Kunai & Shurikens",
    weaponIcon: "assets/icons/icon_crit.png",
    lore: `"When the crimson mist swallowed the Hidden Village Outskirts, Kaito was the lone watchman to return alive. Having honed the forbidden twin-fang kunai technique in silence, he now dances across the blighted farmsteads like a phantom—striking down shambling horrors before their claws can touch the earth."`,
    perks: [
      "🥷 <strong>Primary Projectile:</strong> Razor-sharp Kunais & Shurikens that clash with enemy arrows",
      "⚡ <strong>Innate Swiftness:</strong> +20% Base Movement Speed (1.20x) to kite any horde",
      "💨 <strong>Phantom Reflexes:</strong> Fastest Dodge Roll cooldown in the game (1.10s)",
      "🗡️ <strong>Dual Kunai Mastery:</strong> Scales rapidly with multi-shot volleys and Void Singularity"
    ],
    ultName: "Shadow Clone Shuriken Storm",
    ultDesc: "Unleashes an omnidirectional spiral barrage of razor kunais while granting phantom haste, shredding surrounding hordes and deflecting incoming projectiles.",
    stats: {
      hpPct: "67%", hpText: "100 HP (Agile)",
      spdPct: "100%", spdText: "1.20x (+20%)",
      dodgePct: "100%", dodgeText: "1.10s Cooldown",
      aoePct: "78%", aoeText: "High Multi-Shot Precision"
    }
  },
  paladin: {
    nameHeading: "Sir Gareth — The Iron Paladin",
    titleBadge: "IRON PALADIN",
    kicker: "HEAVY ARMORED JUGGERNAUT",
    color: "#ffd940",
    portrait: "assets/portraits/iron_paladin_portrait.png",
    spriteClass: "sprite-paladin",
    weaponName: "Shortswords & Aegis Shield",
    weaponIcon: "assets/weapons/shortsword.png",
    lore: `"Sworn defender of the Sacred Citadel before the Royal Necropolis fell to the Lich Sovereign's curse. Clad in blessed tempered plate steel, Sir Gareth refuses to yield a single step—hurling consecrated broadswords while his Aegis Forcefield shatters incoming bone volleys."`,
    perks: [
      "⚔️ <strong>Primary Projectile:</strong> Heavy Tempered Shortswords with high impact & knockback",
      "🛡️ <strong>Fortress Vitality:</strong> +50 Bonus Base Health (150 Max HP from level 1)",
      "✨ <strong>Innate Aegis Barrier:</strong> Starts every run with the Aegis Forcefield Barrier unlocked",
      "🔨 <strong>Crushing Presence:</strong> Excels at holding the center plaza during Horde Surges"
    ],
    ultName: "Judgment of the Sacred Citadel",
    ultDesc: "Calls down a massive shockwave of consecrated golden light that purges surrounding undead, restores vitality, and supercharges the Aegis Barrier.",
    stats: {
      hpPct: "100%", hpText: "150 HP (+50 Bonus)",
      spdPct: "75%", spdText: "0.95x (Heavy Plate)",
      dodgePct: "72%", dodgeText: "1.50s Cooldown",
      aoePct: "90%", aoeText: "Defensive Shockwave Dome"
    }
  },
  alchemist: {
    nameHeading: "Doctor Vex — The Plague Alchemist",
    titleBadge: "PLAGUE ALCHEMIST",
    kicker: "VENOM & AREA-DENIAL APOTHECARY",
    color: "#4dff73",
    portrait: "assets/portraits/plague_alchemist_portrait.png",
    spriteClass: "sprite-alchemist",
    weaponName: "Potion Vials & Toxic Mist",
    weaponIcon: "assets/weapons/potion_vial.png",
    lore: `"Exiled from the Royal Academy for brewing volatile reagents deemed too unstable for mortal warfare. When the dead rose from their graves, Doctor Vex simply adjusted his brass goggles and smiled—turning the entire battlefield into a bubbling cauldron of corrosive emerald vapor."`,
    perks: [
      "🧪 <strong>Primary Projectile:</strong> Tumbling Glass Potion Vials that shatter on contact",
      "☣️ <strong>Expanded Fumes:</strong> +35% Toxic Mist Area radius on all poison clouds",
      "⏳ <strong>Lingering Corrosion:</strong> Poison and acid ground clouds persist +2 seconds longer",
      "💚 <strong>Innate Venom Flask:</strong> Starts every run with the Alchemist's Acid Flask unlocked + 115 Base HP"
    ],
    ultName: "Cataclysmic Blight Concoction",
    ultDesc: "Drenches the arena in a massive ring of hyper-corrosive alchemical puddles that melt enemy armor and dissolve entire waves into toxic vapor.",
    stats: {
      hpPct: "78%", hpText: "115 HP (+15 Bonus)",
      spdPct: "86%", spdText: "1.05x (+5%)",
      dodgePct: "84%", dodgeText: "1.30s Cooldown",
      aoePct: "100%", aoeText: "Extreme Area Denial (+35%)"
    }
  },
  warden: {
    nameHeading: "Zephyr — The Storm Warden",
    titleBadge: "STORM WARDEN",
    kicker: "ARCANE THUNDER & COOLDOWN BATTLE MAGE",
    color: "#59bfff",
    portrait: "assets/portraits/storm_warden_portrait.png",
    spriteClass: "sprite-warden",
    weaponName: "Electric Plasma Balls & Thunder",
    weaponIcon: "assets/weapons/electric_ball.png",
    lore: `"A tempest-born battle mage who communes with the upper storm strata above the Cursed Sanctum. Wherever Zephyr strides, ozone fills the air and azure lightning arcs from the heavens—reducing towering bone monarchs and undead legions to smoking cinders."`,
    perks: [
      "⚡ <strong>Primary Projectile:</strong> Crackling Electric Plasma Balls with high-voltage trails",
      "⏱️ <strong>Arcane Haste:</strong> -15% Weapon Cooldowns across all equipped auto-weapons",
      "🌩️ <strong>Storm Conduit:</strong> +1 Extra Sky Lightning Strike per volley",
      "🔷 <strong>Innate Chain Lightning:</strong> Starts every run with Heaven's Chain Lightning unlocked + 110 Base HP"
    ],
    ultName: "Wrath of the Tempest Sovereign",
    ultDesc: "Unleashes a screen-wide thunderstorm that hammers every visible enemy with chained high-voltage lightning bolts and electrifies the ground.",
    stats: {
      hpPct: "74%", hpText: "110 HP (+10 Bonus)",
      spdPct: "92%", spdText: "1.10x (+10%)",
      dodgePct: "88%", dodgeText: "1.25s Cooldown",
      aoePct: "96%", aoeText: "Screen-Wide Chain Arcs"
    }
  }
};

let currentHeroKey = "shinobi";
let currentDirection = "down";

function renderHeroDetail(heroKey) {
  const data = HERO_DATA[heroKey];
  if (!data) return;
  currentHeroKey = heroKey;

  document.querySelectorAll(".hero-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.hero === heroKey);
  });

  const frame = document.getElementById("heroPortraitFrame");
  frame.style.borderColor = data.color;
  document.getElementById("heroPortraitImg").src = data.portrait;
  document.getElementById("heroTitleBadge").textContent = data.titleBadge;
  document.getElementById("heroTitleBadge").style.color = data.color;

  const spriteEl = document.getElementById("interactiveHeroSprite");
  spriteEl.className = `pixel-sprite ${data.spriteClass}`;
  spriteEl.setAttribute("data-dir", currentDirection);

  const kicker = document.getElementById("heroClassKicker");
  kicker.textContent = data.kicker;
  kicker.style.color = data.color;

  document.getElementById("heroNameHeading").textContent = data.nameHeading;
  document.getElementById("heroWeaponIcon").src = data.weaponIcon;
  document.getElementById("heroWeaponName").textContent = data.weaponName;
  document.getElementById("heroLoreQuote").textContent = data.lore;
  document.getElementById("heroLoreQuote").style.borderLeftColor = data.color;

  const perksList = document.getElementById("heroPerksList");
  perksList.innerHTML = data.perks.map(p => `<li>${p}</li>`).join("");

  document.getElementById("heroUltName").textContent = data.ultName;
  document.getElementById("heroUltDesc").textContent = data.ultDesc;

  document.getElementById("barHp").style.width = data.stats.hpPct;
  document.getElementById("valHp").textContent = data.stats.hpText;

  document.getElementById("barSpeed").style.width = data.stats.spdPct;
  document.getElementById("valSpeed").textContent = data.stats.spdText;

  document.getElementById("barDodge").style.width = data.stats.dodgePct;
  document.getElementById("valDodge").textContent = data.stats.dodgeText;

  document.getElementById("barAoe").style.width = data.stats.aoePct;
  document.getElementById("valAoe").textContent = data.stats.aoeText;
}

// ============================================================================
// 2. HUNTER'S BESTIARY & WORLD BOSSES CATALOG
// ============================================================================
const BESTIARY_DATA = [
  {
    category: "boss",
    name: "Giant Zombie Brute",
    threat: "WORLD BOSS (STAGE 01)",
    color: "#ff4747",
    portrait: "assets/portraits/giant_zombie_portrait.png",
    hp: "3,000 HP (25% Armor)",
    speed: "1.65 (Heavy)",
    dmg: "22 DMG / Slam",
    lore: "A monstrous undead behemoth stitched together from dozens of fallen warriors. Its thick rotting hide absorbs 25% of all incoming damage while its fists shatter the earth.",
    tactic: "Keep a medium distance, kite around village benches, and use Venomous Mist to burn through its 25% damage reduction."
  },
  {
    category: "boss",
    name: "Giant Skeleton King",
    threat: "WORLD BOSS (STAGE 02)",
    color: "#ffa626",
    portrait: "assets/portraits/giant_skeleton_portrait.png",
    hp: "3,500 HP (15% Armor)",
    speed: "1.75 (Deliberate)",
    dmg: "20 DMG / Multi-Volley",
    lore: "The crowned monarch of the Royal Necropolis catacombs. Wields a colossal bone longbow capable of firing sweeping fan volleys of unstoppable royal arrows.",
    tactic: "His heavy boss arrows CANNOT be deflected by weapons! Use your Dodge Roll i-frames to slip cleanly through the arrow spread."
  },
  {
    category: "boss",
    name: "The Lich Sovereign",
    threat: "ARCH-NEMESIS (STAGE 03)",
    color: "#d959ff",
    portrait: "assets/portraits/the_lich_portrait.png",
    hp: "5,000 HP (20% Armor)",
    speed: "1.85 + Teleport",
    dmg: "30 DMG / Arcane Burst",
    lore: "The undying sorcerer sovereign who unleashed the necrotic blight upon the realm. Commands swirling bullet-hell orb spirals, purple soulfire waves, and dark vortexes.",
    tactic: "His soulfire arcane orbs are unstoppable! Watch his cast telegraphs and roll through the spiral gaps."
  },
  {
    category: "boss",
    name: "Ryan Jacob Solomon",
    threat: "SECRET BOSS (CASINO DOMAIN)",
    color: "#2ee0a6",
    portrait: "assets/portraits/jared_boss_portrait.png",
    hp: "10,000 HP (Gacha Funded)",
    speed: "2.05 (Aggressive)",
    dmg: "24 DMG + Tilt",
    lore: "A legendary high-roller gamer hopelessly addicted to casino slot-machine 'scatters', jackpot spins, and draining his bank account on Valorant Points (VP) and Night Market knife bundles.",
    tactic: "His flying banknotes, poker chips, scatter symbols, and toxic verbal word bubbles ('TOUCH GRASS!') cannot be deflected! Stay mobile during his Jackpot barrage."
  },
  {
    category: "minion",
    name: "Shambling Zombie",
    threat: "CORE HORDE MINION",
    color: "#7ae67a",
    portrait: "assets/portraits/zombie_portrait.png",
    hp: "100 Base HP",
    speed: "2.0 (Steady)",
    dmg: "10 DMG / Melee",
    lore: "Reanimated villagers and farmhands consumed by the necrotic plague. Slow individually, but lethal when closing in from all sides during a Horde Surge.",
    tactic: "Funnel them into tight choke points and detonate Explosive Barrels or Acid Flask clouds to clear entire packs."
  },
  {
    category: "minion",
    name: "Skeleton Archer",
    threat: "RANGED BONE SNIPER",
    color: "#59d9ff",
    portrait: "assets/portraits/skeleton_archer_portrait.png",
    hp: "50 Base HP",
    speed: "1.8 (Kites at 7m)",
    dmg: "5 DMG / Arrow",
    lore: "Skeletal marksmen who retain their battlefield discipline in death. They hold position at 7 meters and retreat if approached while raining bone arrows.",
    tactic: "Your own projectiles and Whirlwind Sawblades can clash with and DEFLECT their arrows right back into the horde!"
  },
  {
    category: "minion",
    name: "Rabid Hunting Hound",
    threat: "FAST PACK FLANKER",
    color: "#ff8033",
    portrait: "assets/portraits/hunting_dog_portrait.png",
    hp: "40 Base HP",
    speed: "3.8 (Very Fast)",
    dmg: "10 DMG / Bite",
    lore: "Vicious war hounds driven mad by cursed starvation. They sprint nearly twice as fast as zombies to corner and surround fleeing survivors.",
    tactic: "Deploy the Aegis Forcefield Barrier or Orbiting Sawblades to intercept their high-speed lunges."
  },
  {
    category: "minion",
    name: "The Golden Scavenger",
    threat: "RARE TREASURE EVENT (01:15)",
    color: "#ffe040",
    portrait: "assets/portraits/golden_scavenger_portrait.png",
    hp: "130 HP",
    speed: "4.1 (Fleeing)",
    dmg: "0 DMG (Panicked)",
    lore: "A greedy, cowardly treasure goblin carrying an overflowing sack of stolen gold coins. Appears at 01:15 and flees in terror while leaving glowing golden footprints.",
    tactic: "Follow its glowing golden footprint trail and slay it before its 26-second escape portal opens to win 15 gold coins + a Golden Treasure Chest!"
  },
  {
    category: "elite",
    name: "Elite Champion Warlords",
    threat: "DIABLO-STYLE ELITE MUTATION",
    color: "#ffa633",
    portrait: "assets/portraits/hero_portrait.png",
    hp: "4.0x Normal HP",
    speed: "2.3 - 4.2 (Boosted)",
    dmg: "14 DMG + Affix",
    lore: "Towering armored warlords infused with one of four elemental affixes: Molten (lava trail & fireball nova), Vortex (gravity pull), Shielded (2 orbiting runic shield orbs), or Splitter (twin phantasm clones).",
    tactic: "For Shielded Champions, target and shatter the 2 orbiting crystalline orbs first to break their invulnerability dome! Always drops 42g + a Golden Treasure Chest."
  }
];

function renderBestiary(filter = "all") {
  const grid = document.getElementById("bestiaryGrid");
  const items = filter === "all"
    ? BESTIARY_DATA
    : BESTIARY_DATA.filter(item => item.category === filter);

  grid.innerHTML = items.map(item => `
    <div class="beast-card">
      <div>
        <div class="beast-top">
          <img src="${item.portrait}" alt="${item.name}" style="border-color:${item.color}" />
          <div>
            <span class="beast-threat" style="color:${item.color}">${item.threat}</span>
            <h4>${item.name}</h4>
          </div>
        </div>
        <div class="beast-stats">
          <div><span>VITALITY</span><strong>${item.hp}</strong></div>
          <div><span>SPEED</span><strong>${item.speed}</strong></div>
          <div><span>OFFENSE</span><strong>${item.dmg}</strong></div>
        </div>
        <p class="beast-lore">${item.lore}</p>
      </div>
      <div class="beast-tactic">
        <strong>Tactical Advice:</strong> ${item.tactic}
      </div>
    </div>
  `).join("");
}

// ============================================================================
// 3. EVENT LISTENERS & AMBIENT EMBER CANVAS
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize default hero & bestiary
  renderHeroDetail("shinobi");
  renderBestiary("all");

  // Hero tab clicks
  document.querySelectorAll(".hero-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      renderHeroDetail(tab.dataset.hero);
    });
  });

  // Top squad showcase clicks -> jump to hero detail
  document.querySelectorAll("[data-select-hero]").forEach(card => {
    card.addEventListener("click", () => {
      const heroKey = card.getAttribute("data-select-hero");
      renderHeroDetail(heroKey);
      document.getElementById("heroes").scrollIntoView({ behavior: "smooth" });
    });
  });

  // 4-Directional Sprite Preview buttons
  document.querySelectorAll(".dir-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentDirection = btn.dataset.dir;
      document.querySelectorAll(".dir-btn").forEach(b => b.classList.toggle("active", b === btn));
      const spriteEl = document.getElementById("interactiveHeroSprite");
      spriteEl.setAttribute("data-dir", currentDirection);
    });
  });

  // Bestiary filter buttons
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.toggle("active", b === btn));
      renderBestiary(btn.dataset.filter);
    });
  });

  // Official Trailer Theater controls & auto-chaining reel
  const videoEl = document.getElementById("mainTrailerVideo");
  const bigPlayBtn = document.getElementById("bigTrailerPlayBtn");
  const autoReelCheckbox = document.getElementById("autoReelCheckbox");

  if (videoEl && bigPlayBtn) {
    videoEl.addEventListener("error", () => {
      if (currentVideoCandidates.length > 0 && currentCandidateIdx + 1 < currentVideoCandidates.length) {
        currentCandidateIdx += 1;
        videoEl.src = currentVideoCandidates[currentCandidateIdx];
        videoEl.load();
        if (pendingAutoPlay) {
          videoEl.play().catch(() => {});
        }
      }
    });

    loadTrailerChapter(0, false);

    bigPlayBtn.addEventListener("click", () => {
      videoEl.play();
    });

    videoEl.addEventListener("play", () => {
      bigPlayBtn.classList.add("hidden");
    });

    videoEl.addEventListener("pause", () => {
      if (videoEl.currentTime < 0.5 || videoEl.ended) {
        bigPlayBtn.classList.remove("hidden");
      }
    });

    videoEl.addEventListener("ended", () => {
      if (autoReelCheckbox && autoReelCheckbox.checked) {
        const nextIndex = (currentTrailerIndex + 1) % TRAILER_CHAPTERS.length;
        loadTrailerChapter(nextIndex, true);
      } else {
        bigPlayBtn.classList.remove("hidden");
      }
    });
  }

  document.querySelectorAll(".chapter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-chapter"), 10);
      loadTrailerChapter(idx, true);
    });
  });

  const watchHeroBtn = document.getElementById("watchHeroCinematicBtn");
  if (watchHeroBtn) {
    watchHeroBtn.addEventListener("click", () => {
      const idx = TRAILER_CHAPTERS.findIndex(c => c.heroKey === currentHeroKey);
      if (idx >= 0) {
        loadTrailerChapter(idx, true);
        document.getElementById("trailer").scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Ambient floating embers canvas
  initEmberCanvas();
});

function initEmberCanvas() {
  const canvas = document.getElementById("emberCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const colors = ["#ff2a38", "#ffd447", "#33e6ff", "#b85cff"];
  const particles = Array.from({ length: 42 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2.2 + 0.8,
    vx: (Math.random() - 0.5) * 0.35,
    vy: -(Math.random() * 0.55 + 0.2),
    alpha: Math.random() * 0.55 + 0.15,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  function step() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) {
        p.y = h + 10;
        p.x = Math.random() * w;
      }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

