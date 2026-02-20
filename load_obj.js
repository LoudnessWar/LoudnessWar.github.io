function parseOBJ(text) {
    const vertices = [];
    const faces = [];

    const lines = text.split('\n');

    for (const line of lines) {
        const parts = line.trim().split(/\s+/);

        if (parts[0] === 'v') {
            vertices.push({
                x: parseFloat(parts[1]),
                y: parseFloat(parts[2]),
                z: parseFloat(parts[3])
            });
        }

        if (parts[0] === 'f') {
            const face = parts.slice(1).map(p => {
                const index = p.split('/')[0];
                return parseInt(index) - 1;
            });
            faces.push(face);
        }
    }

    return { vertices, faces };
}
