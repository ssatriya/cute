SELECT
  `cute`.`user`.`id` AS `userId`,
  `cute`.`user`.`nip` AS `nip`,
  `cute`.`user`.`namaLengkap` AS `namaLengkap`,
  `cute`.`jenisCuti`.`id` AS `idJenisCuti`,
  concat(`cute`.`jenisCuti`.`namaCuti`, ' ', year(NOW())) AS `namaCuti`,
  coalesce(sum(`cute`.`cuti`.`lamaCuti`), 0) AS `lamaCuti`,
(
    `cute`.`jenisCuti`.`lamaCuti` - coalesce(sum(`cute`.`cuti`.`lamaCuti`), '0')
  ) AS `sisaCuti`
FROM
  (
    (
      `cute`.`user`
      JOIN `cute`.`jenisCuti`
    )
    LEFT JOIN `cute`.`cuti` ON(
      (
        (
          `cute`.`jenisCuti`.`id` = `cute`.`cuti`.`idJenisCuti`
        )
        AND (`cute`.`user`.`nip` = `cute`.`cuti`.`nip`)
        AND (`cute`.`cuti`.`statusAkhir` = 'diterima')
        AND (
          year(`cute`.`cuti`.`tanggalPengajuan`) = year(NOW())
        )
      )
    )
  )
GROUP BY
  `cute`.`user`.`nip`,
  `cute`.`user`.`id`,
  `cute`.`user`.`namaLengkap`,
  `cute`.`jenisCuti`.`id`

-- 

  SELECT
  `cute`.`user`.`id` AS `userId`,
  `cute`.`user`.`nip` AS `nip`,
  `cute`.`user`.`namaLengkap` AS `namaLengkap`,
  `cute`.`jenisCuti`.`id` AS `idJenisCuti`,
  concat(
    `cute`.`jenisCuti`.`namaCuti`,
    ' ',
(year(NOW()) - 1)
  ) AS `namaCuti`,
  coalesce(sum(`cute`.`cuti`.`lamaCuti`), 0) AS `lamaCuti`,
(
    `cute`.`jenisCuti`.`lamaCuti` - coalesce(sum(`cute`.`cuti`.`lamaCuti`), '0')
  ) AS `sisaCuti`
FROM
  (
    (
      `cute`.`user`
      JOIN `cute`.`jenisCuti`
    )
    LEFT JOIN `cute`.`cuti` ON(
      (
        (
          `cute`.`jenisCuti`.`id` = `cute`.`cuti`.`idJenisCuti`
        )
        AND (`cute`.`user`.`nip` = `cute`.`cuti`.`nip`)
        AND (`cute`.`cuti`.`statusAkhir` = 'diterima')
        AND (
          year(`cute`.`cuti`.`tanggalPengajuan`) = (year(NOW()) - 1)
        )
      )
    )
  )
GROUP BY
  `cute`.`user`.`nip`,
  `cute`.`user`.`id`,
  `cute`.`user`.`namaLengkap`,
  `cute`.`jenisCuti`.`id`


--   

SELECT
  `cute`.`user`.`id` AS `userId`,
  `cute`.`user`.`nip` AS `nip`,
  `cute`.`user`.`namaLengkap` AS `namaLengkap`,
  `cute`.`jenisCuti`.`id` AS `idJenisCuti`,
  concat(
    `cute`.`jenisCuti`.`namaCuti`,
    ' ',
(year(NOW()) - 2)
  ) AS `namaCuti`,
  coalesce(sum(`cute`.`cuti`.`lamaCuti`), 0) AS `lamaCuti`,
(
    `cute`.`jenisCuti`.`lamaCuti` - coalesce(sum(`cute`.`cuti`.`lamaCuti`), '0')
  ) AS `sisaCuti`
FROM
  (
    (
      `cute`.`user`
      JOIN `cute`.`jenisCuti`
    )
    LEFT JOIN `cute`.`cuti` ON(
      (
        (
          `cute`.`jenisCuti`.`id` = `cute`.`cuti`.`idJenisCuti`
        )
        AND (`cute`.`user`.`nip` = `cute`.`cuti`.`nip`)
        AND (`cute`.`cuti`.`statusAkhir` = 'diterima')
        AND (
          year(`cute`.`cuti`.`tanggalPengajuan`) = (year(NOW()) - 2)
        )
      )
    )
  )
GROUP BY
  `cute`.`user`.`nip`,
  `cute`.`user`.`id`,
  `cute`.`user`.`namaLengkap`,
  `cute`.`jenisCuti`.`id`