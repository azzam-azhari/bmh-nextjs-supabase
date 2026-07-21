import {
    Map,
    MapMarker,
    MarkerContent,
    MarkerPopup,
    MarkerTooltip,
} from "@/components/ui/map";

const locations = [
    {
        id: 1,
        name: "BMH Pusat",
        lng: 106.84407656761798,
        lat: -6.254935654890728,
    },
    {
        id: 2,
        name: "BMH Tangerang",
        lng: 106.77046453223531,
        lat: -6.378978541968225,
    },
    {
        id: 3,
        name: "BMH Jawa Barat   ",
        lng: 107.61791271422778,
        lat: -6.917363331622034,
    },
    {
        id: 4,
        name: "BMH Jawa Timur",
        lng: 112.69911955970185,
        lat: -7.567951689233896,
    },
    {
        id: 5,
        name: "BMH Jawa Tengah",
        lng: 110.16802462479992,
        lat: -6.998411505181886,
    },
];

export default function Perwakilan() {
    return (
        <section className="py-5 sm:py-6 md:py-12 lg:py-12 xl:py-20 bg-background ">
            <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col md:flex-row gap-10 ">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-foreground">Lokasi Perwakilan BMH</h1>
                    <p className="text-muted-foreground mt-2">Kantor Perwakilan Baitul Maal Hidayatullah tersebar di seluruh Indonesia. Berikut adalah lokasi kantor perwakilan kami:</p>

                </div>
                <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-md border border-border">
                    {/* Atur koordinat tengah (longitude, latitude) dan level zoom */}
                    <Map center={[110.16802462479992, -6.998411505181886]} zoom={6} theme="light">
                        {locations.map((location) => (
                            <MapMarker
                                key={location.id}
                                longitude={location.lng}
                                latitude={location.lat}
                            >
                                <MarkerContent>
                                    <div className="bg-primary size-4 rounded-full border-2 border-white shadow-lg" />
                                </MarkerContent>
                                <MarkerTooltip>{location.name}</MarkerTooltip>
                                <MarkerPopup>
                                    <div className="space-y-1">
                                        <p className="text-foreground font-medium">{location.name}</p>
                                        <p className="text-muted-foreground text-xs">
                                            {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                                        </p>
                                    </div>
                                </MarkerPopup>
                            </MapMarker>
                        ))}
                    </Map>
                </div>
            </div>
        </section>
    );
}