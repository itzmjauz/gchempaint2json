'use strict'; /*jshint esnext:true*/
var parseXml = require('xml2js').parseString
  , Dict = require('dict')

module.exports =
function convert(xml) {
  var ret
  parseXml(xml, { async: false }, function(err, doc) {
    if (err) throw err
    ret = doc['gcp:chemistry'].molecule.map(function(mol) {
      var atoms = []
        , atomDict = new Dict()
        , findAtom = atomDict.get
        , bonds = []
        , i = 0
      mol.atom.forEach(function(atom) {
        atoms.push({ element: atom.$.element, position: atom.position[0].$ })
        atomDict.set(atom.$.id, i++)
      })

      mol.bond.forEach(function(bond) {
        bonds.push({ order: bond.$.order, a: findAtom(bond.$.begin), b: findAtom(bond.$.end) })
      })

      return { atoms: atoms, bonds: bonds }
    })
  })
  return ret
}
