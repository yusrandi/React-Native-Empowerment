export interface AbuseType {
    id: number;
    title: string;
    description: string;
  }
  
  const abuseTypes: AbuseType[] = [
    {
        id:1,
      title: 'Kekerasan Fisik',
      description: 'Pemukulan, penganiayaan fisik, dan penggunaan kekerasan untuk mengendalikan atau melukai perempuan atau anak-anak.',
    },
    {
        id:2,
      title: 'Kekerasan Seksual',
      description: 'Pemerkosaan, pelecehan seksual, eksploitasi seksual, dan pelecehan verbal yang bersifat seksual.',
    },
    {
        id:3,

      title: 'Kekerasan Emosional dan Psikologis',
      description: 'Ancaman, pengucilan, perundungan (bullying), kontrol emosional, dan manipulasi psikologis.',
    },
    {
        id:4,

      title: 'Perdagangan Manusia',
      description: 'Perdagangan anak-anak dan perempuan untuk tujuan eksploitasi seksual atau kerja paksa.',
    },
    {
        id:5,

      title: 'Pernikahan Anak',
      description: 'Menikahkan anak-anak di bawah umur, yang merupakan bentuk eksploitasi yang menghambat hak-hak mereka dan merusak masa depan.',
    },
    {
        id:6,

      title: 'Diskriminasi dan Pembatasan Hak',
      description: 'Diskriminasi gender dalam akses terhadap pendidikan, pekerjaan, atau keputusan mandiri.',
    },
    {
        id:7,

      title: 'Pelecehan Online',
      description: 'Pelecehan atau ancaman yang terjadi melalui media sosial atau platform online lainnya.',
    },
  ];
  
  export default abuseTypes;
  