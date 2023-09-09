-- CreateTable
CREATE TABLE `Bagian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaBagian` VARCHAR(191) NOT NULL,
    `nipAtasan` VARCHAR(191) NULL,
    `idAtasan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jabatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaJabatan` VARCHAR(191) NOT NULL,
    `idBagian` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JenisCuti` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaCuti` VARCHAR(191) NOT NULL,
    `lamaCuti` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `nip` VARCHAR(191) NULL,
    `namaLengkap` VARCHAR(191) NULL,
    `idJabatan` INTEGER NULL,
    `tempatLahir` VARCHAR(191) NULL,
    `tanggalLahir` DATETIME(3) NULL,
    `jenisKelamin` ENUM('pria', 'wanita') NULL,
    `role` ENUM('karyawan', 'atasan', 'verifikator', 'kepala', 'admin') NULL DEFAULT 'karyawan',
    `tandaTangan` TEXT NULL,
    `setup` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_nip_key`(`nip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cuti` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nip` VARCHAR(191) NOT NULL,
    `namaLengkap` VARCHAR(191) NOT NULL,
    `idJenisCuti` INTEGER NOT NULL,
    `lamaCuti` INTEGER NOT NULL,
    `tanggalPengajuan` DATETIME(3) NOT NULL,
    `tanggalMulai` DATETIME(3) NOT NULL,
    `tanggalSelesai` DATETIME(3) NOT NULL,
    `tanggalArray` JSON NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,
    `alamatSelamaCuti` VARCHAR(191) NOT NULL,
    `berkas` TEXT NULL,
    `idPengganti` INTEGER NOT NULL,
    `idPemohon` INTEGER NOT NULL,
    `statusAkhir` ENUM('proses', 'diterima', 'ditolak') NOT NULL DEFAULT 'proses',
    `tahapVerifikasi` INTEGER NOT NULL DEFAULT 0,
    `persetujuanPengganti` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerifikasiBerkas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idJenisCuti` INTEGER NOT NULL,
    `idCuti` INTEGER NOT NULL,
    `nipVerifikator` VARCHAR(191) NOT NULL,
    `idVerifikator` INTEGER NOT NULL,
    `tanggalVerifikasi` DATETIME(3) NOT NULL,
    `keteranganVerifikasi` VARCHAR(191) NOT NULL,
    `suratCuti` INTEGER NOT NULL,
    `formulirCuti` INTEGER NOT NULL,
    `beritaAcara` INTEGER NOT NULL,
    `berkasCuti` INTEGER NOT NULL,
    `statusVerifikasi` ENUM('proses', 'diterima', 'ditolak') NULL,

    UNIQUE INDEX `VerifikasiBerkas_idCuti_key`(`idCuti`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerifikasiAtasan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idJenisCuti` INTEGER NOT NULL,
    `idCuti` INTEGER NOT NULL,
    `nipAtasan` VARCHAR(191) NOT NULL,
    `idAtasan` INTEGER NOT NULL,
    `tanggalVerifikasi` DATETIME(3) NOT NULL,
    `keteranganVerifikasi` VARCHAR(191) NOT NULL,
    `statusVerifikasi` ENUM('proses', 'diterima', 'ditolak') NOT NULL,

    UNIQUE INDEX `VerifikasiAtasan_idCuti_key`(`idCuti`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerifikasiKepala` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idJenisCuti` INTEGER NOT NULL,
    `idCuti` INTEGER NOT NULL,
    `nipKepala` VARCHAR(191) NOT NULL,
    `idKepala` INTEGER NOT NULL,
    `tanggalVerifikasi` DATETIME(3) NOT NULL,
    `keteranganVerifikasi` VARCHAR(191) NOT NULL,
    `statusVerifikasi` ENUM('proses', 'diterima', 'ditolak') NOT NULL,

    UNIQUE INDEX `VerifikasiKepala_idCuti_key`(`idCuti`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bagian` ADD CONSTRAINT `Bagian_idAtasan_fkey` FOREIGN KEY (`idAtasan`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jabatan` ADD CONSTRAINT `Jabatan_idBagian_fkey` FOREIGN KEY (`idBagian`) REFERENCES `Bagian`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_idJabatan_fkey` FOREIGN KEY (`idJabatan`) REFERENCES `Jabatan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cuti` ADD CONSTRAINT `Cuti_idJenisCuti_fkey` FOREIGN KEY (`idJenisCuti`) REFERENCES `JenisCuti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cuti` ADD CONSTRAINT `Cuti_idPengganti_fkey` FOREIGN KEY (`idPengganti`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cuti` ADD CONSTRAINT `Cuti_idPemohon_fkey` FOREIGN KEY (`idPemohon`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerifikasiBerkas` ADD CONSTRAINT `VerifikasiBerkas_idJenisCuti_fkey` FOREIGN KEY (`idJenisCuti`) REFERENCES `JenisCuti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerifikasiBerkas` ADD CONSTRAINT `VerifikasiBerkas_idCuti_fkey` FOREIGN KEY (`idCuti`) REFERENCES `Cuti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerifikasiBerkas` ADD CONSTRAINT `VerifikasiBerkas_idVerifikator_fkey` FOREIGN KEY (`idVerifikator`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerifikasiAtasan` ADD CONSTRAINT `VerifikasiAtasan_idJenisCuti_fkey` FOREIGN KEY (`idJenisCuti`) REFERENCES `JenisCuti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerifikasiAtasan` ADD CONSTRAINT `VerifikasiAtasan_idCuti_fkey` FOREIGN KEY (`idCuti`) REFERENCES `Cuti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerifikasiAtasan` ADD CONSTRAINT `VerifikasiAtasan_idAtasan_fkey` FOREIGN KEY (`idAtasan`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerifikasiKepala` ADD CONSTRAINT `VerifikasiKepala_idJenisCuti_fkey` FOREIGN KEY (`idJenisCuti`) REFERENCES `JenisCuti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerifikasiKepala` ADD CONSTRAINT `VerifikasiKepala_idCuti_fkey` FOREIGN KEY (`idCuti`) REFERENCES `Cuti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerifikasiKepala` ADD CONSTRAINT `VerifikasiKepala_idKepala_fkey` FOREIGN KEY (`idKepala`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
