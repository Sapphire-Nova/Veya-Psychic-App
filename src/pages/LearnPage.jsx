import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const LearnPage = () => {
  const { topic } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);

  const library = {
    Crystals: [
      { name: "Aquamarine", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/aquamarine/macro-mineral-stone-aquamarine-black-background_254845-6375.avif", element: "Water", chakra: "Throat", properties: "A stone of eternal youth and happiness. Provides a shield for the aura.", use: "Hold during meditation to soothe social anxiety." },
      { name: "Black Obsidian", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/black+obsidian/1.webp", element: "Earth/Fire", chakra: "Root", properties: "A strongly protective stone that forms a shield against negativity.", use: "Use as a mirror to reveal the shadow self." },
      { name: "Black Tourmaline", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/black+tourmaline/360_F_663481336_qfo9b7soC2kEOv02KHiYGp10ILotsYVu.jpg", element: "Earth", chakra: "Root", properties: "The premier stone of protection. Cleanses and purifies dense energy.", use: "Grid the corners of your home to repel EMF." },
      { name: "Carnelian", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/carnelian/images.jpg", element: "Fire", chakra: "Sacral", properties: "Full of life force and vitality. Stimulates creativity.", use: "Carry to boost motivation and confidence." },
      { name: "Citrine", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/citrine/360_F_1171493078_fQmaVIe4YwqMZsUl57lPUlUE2vvKqwbc.jpg", element: "Fire/Air", chakra: "Solar Plexus", properties: "The stone of manifestation and will. Transmutes negative energy instantly.", use: "Keep in your wealth corner to attract financial abundance." },
      { name: "Clear Quartz", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/clear+quartz/download.jpg", element: "All Elements", chakra: "Crown/All", properties: "The 'Master Healer.' Amplifies energy and thought.", use: "Program with specific intentions to magnify their power." },
      { name: "Chrysocolla", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/crysocolla/chrysocolla-fossil-mineral-stone-geological-crystalline-fossil-dark-background-close-up-chrysocolla-fossil-mineral-stone-316396675.webp", element: "Water", chakra: "Throat/Heart", properties: "A stone of communication and goddess energy.", use: "Wear over the throat to enhance teaching and leadership." },
      { name: "Fluorite", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/Fluorite/fluorite-crystal-black-background-high-quality-photo-303234001.webp", element: "Air", chakra: "Third Eye", properties: "Known as the 'Genius Stone.' Brings mental clarity and focus.", use: "Place on your desk to clear mental clutter." },
      { name: "Garnet", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/Garnet/garnet-mineral-stone-front-black-crystal-36701927.webp", element: "Fire", chakra: "Root", properties: "A stone of physical strength and security.", use: "Carry to build endurance during long projects." },
      { name: "Green Aventurine", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/green+aventurine/s-l400.jpg", element: "Earth/Water", chakra: "Heart", properties: "The stone of luck and opportunity.", use: "Carry when starting a new venture for heart-centered success." },
      { name: "Hematite", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/hematite/images.jpg", element: "Earth", chakra: "Root", properties: "Highly effective at grounding and protecting.", use: "Hold to steady the pulse during panic attacks." },
      { name: "Howlite", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/Howlite/pure-abundance-howlite-healing-wand-crystal-shapes-forms-buy-600.webp", element: "Air", chakra: "Crown", properties: "An extremely calming stone for stress reduction.", use: "Place under your pillow for a restful sleep." },
      { name: "Jade", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/Jade/luminous-jade-stone-stockcake.webp", element: "Earth", chakra: "Heart", properties: "Symbolizes serenity, purity, and good luck.", use: "Place near plants to encourage growth and vitality." },
      { name: "Kyanite", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/kyanite/s202060342624006352_p80_i1_w640.jpeg", element: "Air", chakra: "Third Eye/Throat", properties: "Instantly aligns all chakras and subtle bodies.", use: "Use during meditation to act as a psychic bridge." },
      { name: "Labradorite", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/labradorite/labradorite-1920x1080-1.jpg", element: "Water/Air", chakra: "Third Eye", properties: "The stone of magic and protection.", use: "Wear during ritual work to heighten intuition." },
      { name: "Lapis Lazuli", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/lapis+lazuli/LapisLazuliWand__71393.jpg", element: "Air", chakra: "Third Eye/Throat", properties: "Stone of total awareness and inner truth.", use: "Place on the third eye to uncover deep wisdom." },
      { name: "Lepidolite", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/Lepidolite/Lepidolite.webp", element: "Water", chakra: "Heart/Third Eye", properties: "A 'transition stone' for emotional healing.", use: "Carry during times of extreme stress or change." },
      { name: "Malachite", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/Malachite/images.jpg", element: "Earth", chakra: "Heart", properties: "A powerful stone of transformation.", use: "Place on the solar plexus for deep emotional release." },
      { name: "Moonstone", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/moonstone/moonstone.jpg", element: "Water", chakra: "Crown", properties: "The stone of new beginnings and lunar energy.", use: "Use during the New Moon to plant seeds of intention." },
      { name: "Pyrite", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/Pyrite/istockphoto-918580202-612x612.jpg", element: "Earth/Fire", chakra: "Solar Plexus", properties: "An excellent energy shield against emotional attack.", use: "Place on your desk to promote bold leadership." },
      { name: "Rhodonite", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/rhodonite/rhodonite-1920x1080-4.jpg", element: "Earth/Fire", chakra: "Heart", properties: "Stone of emotional balance and forgiveness.", use: "Hold to find calm or help forgive past hurts." },
      { name: "Rose Quartz", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/rose+quartz/rose-quartz-crystals-isolate-black-background_332246-47.avif", element: "Water", chakra: "Heart", properties: "The stone of unconditional love.", use: "Place in the relationship corner of your bedroom." },
      { name: "Selenite", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/selenite/lamp-raw-selenite-mineral-double-spiral-lamp-air-purifying-home-decor-146343.webp", element: "Air", chakra: "Crown", properties: "High-vibration crystal of 'liquid light.'", use: "Wave around your aura to clear stagnant energies." },
      { name: "Smokey Quartz", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/smokey+quartz/Smoky-Quartz-A-Misty-Gemstone-Gifted-by-the-Earth-2-1400x784.jpg", element: "Earth/Air", chakra: "Root", properties: "Efficient grounding and anchoring stone.", use: "Hold when feeling overwhelmed by negative thoughts." },
      { name: "Sodalite", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/Sodalite/trumbled-sodalite-mineral-stone-front-black-background-oval-shape-mineralogy-esotericism-154708452.webp", element: "Air/Water", chakra: "Throat/Third Eye", properties: "Unites logic with intuition for rational thought.", use: "Carry during public speaking to ensure harmony." },
      { name: "Sunstone", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/sunstone/polished-sunstone-heliolite-gemstone-dark-macro-shooting-natural-mineral-rock-specimen-polished-sunstone-heliolite-gemstone-103410386.webp", element: "Fire", chakra: "Sacral/Solar Plexus", properties: "Joyful stone that restores the sweetness of life.", use: "Use to cut 'cords' with people who drain you." },
      { name: "Tigers Eye", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/tigers+eye/istockphoto-883055018-612x612.jpg", element: "Fire/Earth", chakra: "Solar Plexus/Root", properties: "Protective stone that combines earth and sun energy.", use: "Carry for courage during difficult confrontations." },
      { name: "Turquoise", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Crystals/turquiose/desktop-wallpaper-turquiose-stones-color-and-mobile-background-turquoise-stone.jpg", element: "Earth/Air/Water", chakra: "Throat/Third Eye", properties: "A protective amulet for the traveler.", use: "Wear over the throat to help speak with clarity." }
    ],
    Herbs: [
      { name: "Basil", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/basilherb/basil.png", folklore: "In ancient lore, a man would fall in love with any woman from whom he received a sprig of basil.", purpose: "Wealth attraction, love, and home protection.", use: "Keep a leaf in your wallet to attract money." },
      { name: "Bay Laurel", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/bayleaf/baylaurel.png", folklore: "Used by the Delphic Priestesses to induce prophetic visions.", purpose: "Manifestation, psychic power, and protection.", use: "Write a wish on a dry leaf and burn it." },
      { name: "Belladonna", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/belladonnaplant/belladonna.png", folklore: "Historically used in 'flying ointments' by witches to induce astral projection.", purpose: "Shadow work and breaking through the veil.", use: "Place imagery on your altar to honor the dark goddesses." },
      { name: "Calendula", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/calendula/calendula.png", folklore: "Known as 'Mary's Gold.' Thought to strengthen eyesight and grant luck.", purpose: "Solar healing, legal success, and protection.", use: "Add to a ritual bath for success in business matters." },
      { name: "Catnip", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/catnip/Untitled.png", folklore: "Associated with the goddess Bast. Cats rub it to share secrets.", purpose: "Beauty, joy, and feline familiar magic.", use: "Use in a charm bag to enhance natural attraction." },
      { name: "Cedar", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/cedar/cedarsmudge.png", folklore: "Ancient cultures believed cedar trees were inhabited by gods.", purpose: "Ancient wisdom, clearing spirits, and grounding.", use: "Burn as a smudge to purify a new home." },
      { name: "Chamomile", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/chamomileherb/chamomile.png", folklore: "Known as the 'Plant's Physician' for helping nearby plants.", purpose: "Sleep, peace, and money luck.", use: "Wash hands in chamomile before gambling for luck." },
      { name: "Cinnamon", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/cinnamon/cinnamons.png", folklore: "Believed to be gathered from the nests of phoenix birds.", purpose: "High vibration and speed of manifestation.", use: "Blow over your front door on the 1st of the month." },
      { name: "Clove", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/clove/cloves.png", folklore: "Burned to stop people from gossiping about you.", purpose: "Stopping gossip and protection.", use: "Carry three cloves to prevent ill-speech from others." },
      { name: "Dandelion", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/dandelion/wishing.png", folklore: "Blowing seeds was a way to carry psychic messages.", purpose: "Wishes, divination, and calling spirit guides.", use: "Drink root tea to enhance psychic sight before reading." },
      { name: "Dragons Blood", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/dragons+blood/Untitled.png", folklore: "Lore says it is the actual blood of dragons who fell in battle.", purpose: "Intense power and potency amplification.", use: "Burn resin alongside any herb to double its power." },
      { name: "Echinacea", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/echinaceaherb/theeherb.png", folklore: "Considered a 'Master Offering' to ensure spirits listen.", purpose: "Inner strength and respect from spirits.", use: "Keep dried flowers on altar to strengthen guide bonds." },
      { name: "Elderflower", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/elderflowers/elderflower.png", folklore: "Protection from the Fae and warding off evil.", purpose: "Protection and lunar boundary work.", use: "Hang over doorways to keep out negative influences." },
      { name: "Fennel", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/fennel/fennelherb.png", folklore: "Used to strengthen resolve and keep away unwanted energy.", purpose: "Longevity, courage, and clearing vision.", use: "Carry seeds to strengthen resolve and ward off energy." },
      { name: "Frankincense", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/frankincense/Untitled.png", folklore: "Burned in temples for thousands of years to carry prayers.", purpose: "Highest spiritual vibration and purification.", use: "Burn during deep meditation for divine connection." },
      { name: "Ginger", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/ginger/Untitled.png", folklore: "Used to add 'heat' and speed to any magical work.", purpose: "Speed, passion, and manifestation heat.", use: "Add to charm bags to make them work faster." },
      { name: "Hawthorn", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/hawthrons/hawthorn.png", folklore: "Heart protection and doorway to the Otherworld.", purpose: "Heart shielding and Fairy realm connection.", use: "Used in rituals involving the Fairy realm." },
      { name: "Hemlock", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/hemlock/hemlocks.png", folklore: "Used historically for ritual visualization and banishing.", purpose: "Astral travel and destructive magic (Toxic).", use: "For ritual visualization and banishing only." },
      { name: "Holly", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/hollys/holly.png", folklore: "Associated with winter solstice and protection from lightning.", purpose: "Household protection and warding evil.", use: "Plant near the home to keep out intruders." },
      { name: "Hyssop", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/hyssops/hyssop.png", folklore: "The most important herb for purification baths.", purpose: "Soul purification and cleansing rituals.", use: "Wash sacred tools with a hyssop infusion." },
      { name: "Ivy", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/ivyplant/ivy.png", folklore: "Fidelity, binding, and household protection.", purpose: "Binding magic and shielding from psychic attack.", use: "Grow against the house to shield from attack." },
      { name: "Jasmine", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/jasmine/jasmineflower.png", folklore: "Associated with prophetic dreams and lunar energy.", purpose: "Seduction, love, and psychic dreaming.", use: "Keep in the bedroom to attract spiritual love." },
      { name: "Juniper", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/juniper/junipers.png", folklore: "Hang at entrance to prevent theft and keep safe.", purpose: "Banishing and protection from theft.", use: "Hang to prevent theft and keep the home safe." },
      { name: "Lavender", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/lavender/Untitled.png", folklore: "Lore says smelling it allows you to see spirits clearly.", purpose: "Tranquility, peace, and spiritual opening.", use: "Keep a sachet under pillow for spirit-guided rest." },
      { name: "Lemon Balm", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/lemonbalms/lemonbalm.png", folklore: "Excellent for depression and attracting success.", purpose: "Success, healing, and calming the heart.", use: "Use in social situations to attract success." },
      { name: "Mandrake", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/mandrake/mandrakeroot.png", folklore: "Intense protection and fertility magic.", purpose: "Absolute home protection and potency.", use: "Place a root on the mantle for home protection." },
      { name: "Mint", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/mint/itsmint.png", folklore: "Rub on cash registers to keep money flowing in.", purpose: "Money, healing, and fresh perspectives.", use: "Keep a leaf in your wallet for wealth." },
      { name: "Mugwort", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/mugwortherb/mugwort.png", folklore: "Named after Artemis, the lunar goddess.", purpose: "Lucid dreaming and psychic vision.", use: "Drink as tea before bed for astral travel." },
      { name: "Myrrh", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/myrrh/Untitled.png", folklore: "Used for deep grounding and burial rites.", purpose: "Grounding and sorrow-healing.", use: "Burn with Frankincense for divine balance." },
      { name: "Nettle", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/nettle/nettlesting.png", folklore: "Carry to send energy back to its source.", purpose: "Boundaries, protection, and breaking hexes.", use: "Carry to protect your space from others." },
      { name: "Patchouli", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/patchouli/Untitled.png", folklore: "Associated with earth energy, money, and sensuality.", purpose: "Wealth attraction and grounding.", use: "Sprinkle in a purse for wealth manifestation." },
      { name: "Rosemary", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/rosemary/rosemary.png", folklore: "Ancient scholars wore garlands to improve memory.", purpose: "Memory, clarity, and purification.", use: "Burn to clear mind before deep meditation." },
      { name: "Roses", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/roses/rose.png", folklore: "Lore says Eros brought Roses to inspire hope.", purpose: "Divine love, friendship, and peace.", use: "Use petals in love rituals or heart-healing." },
      { name: "Rowan", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/rowans/rowan.png", folklore: "Wards against enchantment and psychic attack.", purpose: "Psychic defense and warding.", use: "Keep on you to prevent being misled by magic." },
      { name: "Sage", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/sage/Untitled.png", folklore: "One of the most sacred 'Sacrament Herbs.'", purpose: "Total purification and elder wisdom.", use: "Smudge your aura to reset your vibration." },
      { name: "Sandalwood", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/sandalwood/sandalwoods.png", folklore: "Burn to carry wishes to the higher realms.", purpose: "High spiritual frequency and wishes.", use: "Write a wish on a chip and burn in ritual." },
      { name: "St. Johns Wort", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/stjohnswort/st+johns+wort.png", folklore: "Carry to ward off spirits of melancholy.", purpose: "Solar protection and banishing depression.", use: "Carry to invite light and ward off spirits." },
      { name: "Thyme", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/thyme/herbsthyme.png", folklore: "Burn to increase psychic strength.", purpose: "Courage, psychic ability, and seeing Fae.", use: "Burn to increase psychic strength and confidence." },
      { name: "Valerian", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/valerian/valarian.png", folklore: "Used in rituals to settle arguments.", purpose: "Peace, reconciliation, and deep rest.", use: "Use in rituals to settle home arguments." },
      { name: "Vervain", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/vervains/vervain.png", folklore: "The Enchanter's Herb; grants creativity.", purpose: "Creativity, inspiration, and protection.", use: "Perfect for protecting creative work." },
      { name: "Willow", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/willowleaves/willow.png", folklore: "Use branches for moon-centered spells.", purpose: "Grief work, lunar magic, and intuition.", use: "Use to create wands for lunar work." },
      { name: "Wolfsbane", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/wolfsbane/Untitled.png", folklore: "Wards off the wild and unseen entities.", purpose: "Invisibility and protection (Toxic).", use: "Ancient protection used to ward off the unseen." },
      { name: "Wormwood", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/wormwoods/wormwood.png", folklore: "Burn to aid in scrying the other side.", purpose: "Calling spirits and psychic sight.", use: "Burn to aid in contacting the other side." },
      { name: "Yarrow", img: "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/Herbs/yarrow/yarrows.png", folklore: "Achilles used it to heal soldier wounds.", purpose: "Bravery and banishing fear.", use: "Carry in a red bag to keep fear at bay." }
    ]
  };

  const currentItems = library[topic] || [];

  return (
    <div className="min-h-screen pt-24 pb-48 px-4 bg-black">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="text-5xl font-bold uppercase tracking-widest text-white mb-4">{topic}</h1>
        <div className="h-1 w-24 bg-purple-500 mx-auto mb-4"></div>
        <p className="text-zinc-500 italic">Select an element to reveal its spiritual frequency.</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.map((item) => (
          <div 
            key={item.name} 
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer bg-zinc-900/20 border border-white/5 rounded-[40px] overflow-hidden hover:border-purple-500/40 transition-all duration-500"
          >
            <div className="h-56 overflow-hidden relative">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-lg font-bold text-white tracking-tight uppercase">{item.name}</h3>
              <p className="text-[9px] uppercase tracking-[0.3em] text-purple-400 mt-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Deep Wisdom →</p>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-300">
          <div className="relative max-w-lg w-full bg-zinc-950 border border-purple-500/20 rounded-[50px] shadow-[0_0_60px_rgba(168,85,247,0.2)] flex flex-col max-h-[85vh] overflow-hidden">
            <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 z-[210] w-10 h-10 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-all border border-white/10">✕</button>
            <div className="overflow-y-auto">
              <img src={selectedItem.img} alt={selectedItem.name} className="w-full h-72 object-cover border-b border-white/5" />
              <div className="p-10">
                <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-tighter">{selectedItem.name}</h2>
                <div className="space-y-8 pb-4">
                  {topic === 'Crystals' ? (
                    <>
                      <div className="flex gap-6">
                        <div><h4 className="text-[9px] uppercase tracking-[0.4em] text-purple-400 font-black mb-1">Element</h4><p className="text-white text-sm">{selectedItem.element}</p></div>
                        <div><h4 className="text-[9px] uppercase tracking-[0.4em] text-purple-400 font-black mb-1">Chakra</h4><p className="text-white text-sm">{selectedItem.chakra}</p></div>
                      </div>
                      <div><h4 className="text-[9px] uppercase tracking-[0.4em] text-emerald-400 font-black mb-2">Magical Properties</h4><p className="text-zinc-300 text-base leading-relaxed">{selectedItem.properties}</p></div>
                      <div><h4 className="text-[9px] uppercase tracking-[0.4em] text-yellow-400 font-black mb-2">Ritual Use</h4><p className="text-zinc-300 text-base italic leading-relaxed border-l-2 border-yellow-400/30 pl-4">"{selectedItem.use}"</p></div>
                    </>
                  ) : (
                    <>
                      <div><h4 className="text-[9px] uppercase tracking-[0.4em] text-purple-400 font-black mb-2">Ancient Folklore</h4><p className="text-zinc-300 italic text-base leading-relaxed">"{selectedItem.folklore}"</p></div>
                      <div><h4 className="text-[9px] uppercase tracking-[0.4em] text-emerald-400 font-black mb-2">Spiritual Purpose</h4><p className="text-zinc-300 text-base leading-relaxed">{selectedItem.purpose}</p></div>
                      <div><h4 className="text-[9px] uppercase tracking-[0.4em] text-yellow-400 font-black mb-2">Magical Ritual</h4><p className="text-zinc-300 text-base leading-relaxed border-l-2 border-yellow-400/30 pl-4">{selectedItem.use}</p></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnPage;