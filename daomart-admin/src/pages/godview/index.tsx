import React from 'react';
import {MapContainer, Marker, TileLayer, Popup} from 'react-leaflet';
import L, {LatLngExpression} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {NetworkLogComponent} from '../../components/NetworkLog.component';
import {useGetUniqueIpLogs} from '../../hooks/Log.hook';
import {GitcoinContext} from '../../store';
import MarkerIcon from '../../assets/images/marker.png';

const position: LatLngExpression = [59.91174337077401, 10.750425582038146];
function UserContent() {
    const {state} = React.useContext(GitcoinContext);
    const [logs] = useGetUniqueIpLogs(state.token);

    const ips = logs && logs.ips ? logs.ips : [];

    const geolocations =
        logs &&
        logs.geolocations.filter((geo, i) => geo != null && geo != 'null');

    const ipsForGeo =
        logs &&
        logs.ips.filter(
            (geo, i) =>
                logs.geolocations[i] != null || logs.geolocations[i] != 'null'
        );

    const markers =
        geolocations &&
        ipsForGeo &&
        geolocations.map((geoMeta, i) => {
            const geo = JSON.parse(geoMeta)['ll'];

            return (
                <MyMarker
                    key={i}
                    geo={[Number(geo[0]), Number(geo[1])]}
                    ip={ipsForGeo[i]}
                />
            );
        });

    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <p>GODVIEW</p>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    border: '2px solid #0077ff',
                }}
            >
                <Paper
                    style={{
                        height: 800,
                        display: 'flex',
                        flexDirection: 'row',
                        flex: 1,
                    }}
                >
                    <MapContainer center={position} zoom={2} className="map">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {markers}
                    </MapContainer>
                </Paper>
                <Paper
                    style={{
                        width: '20rem',
                        height: 800,
                        overflow: 'auto',
                        borderLeft: '2px solid #0077ff',
                    }}
                >
                    <Typography
                        style={{
                            padding: 12,
                            backgroundColor: '#232323',
                            color: 'white',
                            width: '100%',
                        }}
                    >
                        IP LIST
                    </Typography>
                    {ips.map((ip, i) => (
                        <Typography
                            key={i}
                            style={{
                                padding: 12,
                                textAlign: 'center',
                                borderBottom: '2px solid #232323',
                                width: '100%',
                            }}
                        >
                            {ip}
                        </Typography>
                    ))}
                </Paper>
            </div>
        </Container>
    );
}

export default UserContent;

const LeafletIcon = new L.Icon({
    iconUrl: MarkerIcon,
    iconSize: new L.Point(32, 32),
    iconAnchor: new L.Point(16, 32),
    className: '',
});
const MyMarker = ({geo, ip}: {geo: LatLngExpression; ip: string}) => {
    return (
        <Marker position={geo} icon={LeafletIcon}>
            <Popup>{ip}</Popup>
        </Marker>
    );
};
