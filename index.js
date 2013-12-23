'use strict'; /*jshint esnext:true*/
var parseXml = require('xml2js').parseString
  , Dict = require('dict')

module.exports =
function convert(xml) {
  var ret
  parseXml(xml, { async: false }, function(err, doc) {
    if (err) throw err
    var atoms = []
      , bonds = []
      , i = 0
    ret = { nodes: atoms, links: bonds }

    doc['gcp:chemistry'].molecule.forEach(function(mol) {
      var atomDict = new Dict()
        , findAtom = atomDict.get

      mol.atom.forEach(function(atom) {
        var position = atom.position[0].$ 
        atoms.push({ element: atom.$.element, position: { x: +position.x, y: +position.y } })
        atomDict.set(atom.$.id, i++)
      })

      mol.bond.forEach(function(bond) {
        bonds.push({ count: +bond.$.order, source: findAtom(bond.$.begin), target: findAtom(bond.$.end) })
      })
    })
  })
  return ret
}
