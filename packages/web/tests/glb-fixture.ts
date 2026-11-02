/** A geometric test mesh, never used as a restaurant product or food model. */
export function glbFixture() {
  const positions = new Float32Array([-1, -1, 0, 1, -1, 0, 0, 1, 0]);
  const bin = Buffer.from(positions.buffer);
  const document = {
    asset: { version: "2.0", generator: "Cardapio QA only" },
    scene: 0, scenes: [{ nodes: [0] }], nodes: [{ mesh: 0 }],
    meshes: [{ primitives: [{ attributes: { POSITION: 0 }, material: 0 }] }],
    materials: [{ doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.8, 0.1, 0.1, 1], metallicFactor: 0 } }],
    buffers: [{ byteLength: bin.length }],
    bufferViews: [{ buffer: 0, byteOffset: 0, byteLength: bin.length, target: 34962 }],
    accessors: [{ bufferView: 0, componentType: 5126, count: 3, type: "VEC3", min: [-1, -1, 0], max: [1, 1, 0] }],
  };
  const json = Buffer.from(JSON.stringify(document));
  const padded = Buffer.alloc(Math.ceil(json.length / 4) * 4, 32);
  json.copy(padded);
  const header = Buffer.alloc(20);
  header.write("glTF"); header.writeUInt32LE(2, 4);
  header.writeUInt32LE(28 + padded.length + bin.length, 8);
  header.writeUInt32LE(padded.length, 12); header.writeUInt32LE(0x4e4f534a, 16);
  const binHeader = Buffer.alloc(8);
  binHeader.writeUInt32LE(bin.length, 0); binHeader.writeUInt32LE(0x004e4942, 4);
  return Buffer.concat([header, padded, binHeader, bin]);
}