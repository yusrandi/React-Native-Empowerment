import { registerInDevtools, Store } from "pullstate";



export const WizardStore = new Store({
  s1_nama: "",
  s1_jk: "",
  s1_ttl: "",
  s1_agama: "",
  s1_hubungan: "",
  s1_telp: "",
  s1_kec: "",
  s1_kota: "",
  s1_alamat: "",
  s2_nama: "",
  s2_jk: "",
  s2_ttl: "",
  s2_agama: "",
  s2_hubungan: "",
  s2_telp: "",
  s2_kec: "",
  s2_kota: "",
  s2_alamat: "",
  s3_tanggal: "",
  s3_tempat: "",
  s3_jenis: "",
  s3_bukti: "",
  s4_nik: "",
  s4_tanggal: "",
  s4_nama: "",
  s4_jk: "",
  s4_usia: "",
  s4_ortu: "",
  s4_telp: "",
  s4_kota: "",
  s4_alamat: "",
  s5_alasan: "",
  s5_catatan: "",
  progress: 0,
});

registerInDevtools({
  WizardStore,
});
