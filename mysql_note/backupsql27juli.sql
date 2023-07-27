// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["views"]
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Bagian {
  id         Int       @id @default(autoincrement())
  namaBagian String
  nipAtasan  String?
  atasanId   User      @relation(fields: [idAtasan], references: [id], onDelete: Cascade, onUpdate: Cascade)
  idAtasan   Int
  Jabatan    Jabatan[]
}

model Jabatan {
  id Int @id @default(autoincrement())

  namaJabatan String
  bagianId    Bagian @relation(fields: [idBagian], references: [id], onDelete: Cascade, onUpdate: Cascade)
  idBagian    Int
  Pengguna    User[]
}

model JenisCuti {
  id Int @id @default(autoincrement())

  namaCuti         String
  lamaCuti         Int
  Cuti             Cuti[]
  VerifikasiBerkas VerifikasiBerkas[]
  VerifikasiAtasan VerifikasiAtasan[]
  VerifikasiKepala VerifikasiKepala[]
}

model Account {
  id Int @id @default(autoincrement())

  userId            Int
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id Int @id @default(autoincrement())

  sessionToken String   @unique
  userId       Int
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            Int       @id @default(autoincrement())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?

  nip               String?            @unique
  namaLengkap       String?
  jabatanId         Jabatan?           @relation(fields: [idJabatan], references: [id], onDelete: Cascade, onUpdate: Cascade)
  idJabatan         Int?
  tempatLahir       String?
  tanggalLahir      DateTime?
  jenisKelamin      JenisKelamin?
  role              RolePengguna?      @default(karyawan)
  tandaTangan       String?            @db.Text
  setup             Int                @default(0)
  idPenggantiOnCuti Cuti[]             @relation("idPengganti")
  idPemohonOnCuti   Cuti[]             @relation("idPemohon")
  VerifikasiBerkas  VerifikasiBerkas[]
  VerifikasiAtasan  VerifikasiAtasan[]

  accounts         Account[]
  sessions         Session[]
  VerifikasiKepala VerifikasiKepala[]
  Bagian           Bagian[]
}

// 

model Cuti {
  id                   Int                @id @default(autoincrement())
  nip                  String
  namaLengkap          String
  jenisCutiId          JenisCuti          @relation(fields: [idJenisCuti], references: [id], onDelete: Cascade, onUpdate: Cascade)
  idJenisCuti          Int
  lamaCuti             Int
  tanggalPengajuan     DateTime
  tanggalMulai         DateTime
  tanggalSelesai       DateTime
  tanggalArray         Json
  keterangan           String
  alamatSelamaCuti     String
  berkas               String?            @db.Text
  penggantiId          User               @relation("idPengganti", fields: [idPengganti], references: [id], onDelete: Cascade, onUpdate: Cascade)
  idPengganti          Int
  pemohonId            User               @relation("idPemohon", fields: [idPemohon], references: [id], onDelete: Cascade, onUpdate: Cascade)
  idPemohon            Int
  statusAkhir          StatusCuti         @default(proses)
  tahapVerifikasi      Int                @default(0)
  persetujuanPengganti Int?
  VerifikasiBerkas     VerifikasiBerkas[]
  VerifikasiAtasan     VerifikasiAtasan[]
  VerifikasiKepala     VerifikasiKepala[]
}

// 

model VerifikasiBerkas {
  id                   Int               @id @default(autoincrement())
  jenisCutiId          JenisCuti         @relation(fields: [idJenisCuti], references: [id], onDelete: Cascade, onUpdate: Cascade)
  idJenisCuti          Int
  cutiId               Cuti              @relation(fields: [idCuti], references: [id], onDelete: Cascade, onUpdate: Cascade)
  idCuti               Int
  nipVerifikator       String
  verifikatorId        User              @relation(fields: [idVerifikator], references: [id], onDelete: Cascade, onUpdate: Cascade)
  idVerifikator        Int
  tanggalVerifikasi    DateTime
  keteranganVerifikasi String
  suratCuti            Int
  formulirCuti         Int
  beritaAcara          Int
  berkasCuti           Int
  statusVerifikasi     StatusVerifikasi?
}

model VerifikasiAtasan {
  id                   Int              @id @default(autoincrement())
  jenisCutiId          JenisCuti        @relation(fields: [idJenisCuti], references: [id], onDelete: Cascade, onUpdate: Cascade)
  idJenisCuti          Int
  cutiId               Cuti             @relation(fields: [idCuti], references: [id], onDelete: Cascade, onUpdate: Cascade)
  idCuti               Int
  nipAtasan            String
  atasanId             User             @relation(fields: [idAtasan], references: [id], onDelete: Cascade, onUpdate: Cascade)
  idAtasan             Int
  tanggalVerifikasi    DateTime
  keteranganVerifikasi String
  statusVerifikasi     StatusVerifikasi
}

model VerifikasiKepala {
  id                   Int              @id @default(autoincrement())
  jenisCutiId          JenisCuti        @relation(fields: [idJenisCuti], references: [id], onDelete: Cascade, onUpdate: Cascade)
  idJenisCuti          Int
  cutiId               Cuti             @relation(fields: [idCuti], references: [id], onDelete: Cascade, onUpdate: Cascade)
  idCuti               Int
  nipKepala            String
  kepalaId             User             @relation(fields: [idKepala], references: [id], onDelete: Cascade, onUpdate: Cascade)
  idKepala             Int
  tanggalVerifikasi    DateTime
  keteranganVerifikasi String
  statusVerifikasi     StatusVerifikasi
}

view sisacutin {
  userId      Int     @unique @default(0)
  nip         String?
  namaLengkap String?
  idJenisCuti Int     @default(0)
  namaCuti    String? @db.VarChar(197)
  lamaCuti    Int     @default(0)
  sisaCuti    Int     @default(0)
}

view sisacutin1 {
  userId      Int     @unique @default(0)
  nip         String?
  namaLengkap String?
  idJenisCuti Int     @default(0)
  namaCuti    String? @db.VarChar(198)
  lamaCuti    Int     @default(0)
  sisaCuti    Int     @default(0)
}

view sisacutin2 {
  userId      Int     @unique @default(0)
  nip         String?
  namaLengkap String?
  idJenisCuti Int     @default(0)
  namaCuti    String? @db.VarChar(198)
  lamaCuti    Int     @default(0)
  sisaCuti    Int     @default(0)
}

enum StatusCuti {
  proses
  diterima
  ditolak
}

enum StatusVerifikasi {
  proses
  diterima
  ditolak
}

enum JenisKelamin {
  pria
  wanita
}

enum RolePengguna {
  karyawan
  atasan
  verifikator
  kepala
  admin
}
