import { useEffect } from "react"
import { loader, findBoundary } from "@/utils/utils"

const useCountryMask = (center, countries) => {
    
    useEffect(() => {
        loader.load().then(async () => {
          const map = new google.maps.Map(document.getElementById("map"), {
            center: center,
            zoom: 0.3,
            mapId: process.env.NEXT_PUBLIC_GMAP_STYLE_DASH,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          });
          
          let ids = await Promise.all(
            countries.map(async (country) => {
              const ids = await Promise.all(country.countries.map((country) => findBoundary(country, center)))
              return ids.map((id) => ({id, color: country.color}))
            })
          );

          ids = [].concat(...ids);

          console.log(ids)
    
          const featureLayer = map.getFeatureLayer("COUNTRY");
      
          featureLayer.style = (options) => {
            const id = ids.find(id => id.id === options.feature.placeId)
            if (id) {
              return {
                fillColor: id.color,
                fillOpacity: 0.5,
              }
            }
          };
        });
      }, []);
}

export default useCountryMask