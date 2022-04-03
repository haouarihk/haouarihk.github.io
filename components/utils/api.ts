export namespace Sources {}

export namespace ThirdParty {
  export async function getMyLocation() {
    // get the user ip
    const myIp = (
      await (await fetch("https://api.ipify.org?format=json")).json()
    ).ip;

    // get the user location from ip
    const myloc: { lat: number; lon: number } = await (
      await fetch(`http://ip-api.com/json/${myIp}?fields=lat,lon`)
    ).json();

    return {
      lat: myloc.lat,
      lng: myloc.lon,
      // latitude: myloc.lat,
      // longitude: myloc.lon,
    };
  }
}
