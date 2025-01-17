import OoGui from 'oo-gui/src';

class GuiHelper extends OoGui {
    constructor(data, cbs, env={}) {
        super(data, {
            title: 'geo-viewer',
            width: 240,
        });

        this.onChangeGrids = cbs.onChangeGrids;
        this.onCapture = cbs.onCapture;
        this.onChangeAutoOrbit = cbs.onChangeAutoOrbit;
        this.onChangeVis = cbs.onChangeVis;
        this.onChangeVrLaser = cbs.onChangeVrLaser;
        this.onChangeLeaflet = cbs.onChangeLeaflet;
        this.onChangeLoc = cbs.onChangeLoc;

        this.env = env;
    }

    // impl
    init(gui, data, params) {
        this.locations = { // key: [lat, lng],
            '(none)': [0, 0], // dummy
            'Table Mountain': [-33.9625, 18.4107],
            'Eiger': [46.5763, 7.9904],
            'Colorado River': [36.2058, -112.4413],
            'Mount Fuji': [35.3778, 138.7472],
            'k2': [35.8818, 76.5142],
            // 'Akagi': [36.5457, 139.1766],
            // 'Cruach Ardrain': [56.3562, -4.5940],
            // 'giza': [29.9791, 31.1342],
        };

        this.env.isDev &&
            gui.add(params, 'isDev')
                .name('isDev: true !!')
                .domElement.addEventListener('click', ev => {
                    console.log('this.env:', this.env);
                    if (1) {
                        const { origin, pathname } = window.location;
                        window.location.href = `${origin}${pathname}`;
                    }
                });

        gui.add(params, 'vis', ['Satellite', 'Wireframe', 'Contours'])
            .name('Terrain')
            .onChange(value => {
                this.onChangeVis(value);
                data.vis = value;
            });

        gui.add(params, 'capture')
            .name('Capture Now')
            .domElement.addEventListener('click', ev => {
                this.onCapture();
            });

        gui.add(params, 'grids')
            .name('Grids')
            .onChange(value => {
                this.onChangeGrids(value);
                data.grids = value;
            });

        this.autoOrbitController = gui.add(params, 'autoOrbit')
            .name('Orbit')
            .onChange(value => {
                this.onChangeAutoOrbit(value);
                data.autoOrbit = value;
            });

        gui.add(params, 'vrLaser')
            .name('Laser')
            .onChange(value => {
                this.onChangeVrLaser(value);
                data.vrLaser = value;
            });

        // debug
        0 && gui.add(params, 'reset')
            .name('Reset')
            .domElement.addEventListener('click', ev => {
                this.applyDefaults();
                this.onChangeVis(params.vis);
                this.onChangeAutoOrbit(params.autoOrbit);
                //this.onChangeVrLaser(value);
                Object.assign(data, params);
            });

        gui.add(params, 'leaflet')
            .name('Map')
            .onChange(value => {
                this.onChangeLeaflet(value);
                data.leaflet = value;
            });

        gui.add(params, 'loc', Object.keys(this.locations))
            .name('Location')
            .onChange(value => {
                this.onChangeLoc(value, this.locations);
                data.Loc = value;
            });

        gui.add(params, 'sourceCode')
            .name('Source Code')
            .domElement.addEventListener('click', ev => {
                window.location.href = "https://github.com/w3reality/three-geo/tree/master/examples/geo-viewer";
            });
    }
}

export default GuiHelper;