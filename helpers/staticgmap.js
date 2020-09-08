exports.registerHelpers = (hbs)=>{
    hbs.registerHelper('staticmap',([lng,lat])=>`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=18&size=600x400&key=${process.env.GOOGLE_API_KEY}`)
}