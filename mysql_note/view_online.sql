SELECT
  `enryucom_enryucom_cute11`.`User`.`id` AS `userId`,
  `enryucom_enryucom_cute11`.`User`.`nip` AS `nip`,
  `enryucom_enryucom_cute11`.`User`.`namaLengkap` AS `namaLengkap`,
  `enryucom_enryucom_cute11`.`JenisCuti`.`id` AS `idJenisCuti`,
  concat(`enryucom_enryucom_cute11`.`JenisCuti`.`namaCuti`, ' ', year(NOW())) AS `namaCuti`,
  coalesce(sum(`enryucom_enryucom_cute11`.`Cuti`.`lamaCuti`), 0) AS `lamaCuti`,
(
    `enryucom_enryucom_cute11`.`JenisCuti`.`lamaCuti` - coalesce(sum(`enryucom_enryucom_cute11`.`Cuti`.`lamaCuti`), '0')
  ) AS `sisaCuti`
FROM
  (
    (
      `enryucom_enryucom_cute11`.`User`
      JOIN `enryucom_enryucom_cute11`.`JenisCuti`
    )
    LEFT JOIN `enryucom_enryucom_cute11`.`Cuti` ON(
      (
        (
          `enryucom_enryucom_cute11`.`JenisCuti`.`id` = `enryucom_enryucom_cute11`.`Cuti`.`idJenisCuti`
        )
        AND (`enryucom_enryucom_cute11`.`User`.`nip` = `enryucom_enryucom_cute11`.`Cuti`.`nip`)
        AND (`enryucom_enryucom_cute11`.`Cuti`.`statusAkhir` = 'diterima')
        AND (
          year(`enryucom_enryucom_cute11`.`Cuti`.`tanggalPengajuan`) = year(NOW())
        )
      )
    )
  )
GROUP BY
  `enryucom_enryucom_cute11`.`User`.`nip`,
  `enryucom_enryucom_cute11`.`User`.`id`,
  `enryucom_enryucom_cute11`.`User`.`namaLengkap`,
  `enryucom_enryucom_cute11`.`JenisCuti`.`id`

-- 

  SELECT
  `enryucom_cute1`.`User`.`id` AS `userId`,
  `enryucom_cute1`.`User`.`nip` AS `nip`,
  `enryucom_cute1`.`User`.`namaLengkap` AS `namaLengkap`,
  `enryucom_cute1`.`JenisCuti`.`id` AS `idJenisCuti`,
  concat(
    `enryucom_cute1`.`JenisCuti`.`namaCuti`,
    ' ',
(year(NOW()) - 1)
  ) AS `namaCuti`,
  coalesce(sum(`enryucom_cute1`.`Cuti`.`lamaCuti`), 0) AS `lamaCuti`,
(
    `enryucom_cute1`.`JenisCuti`.`lamaCuti` - coalesce(sum(`enryucom_cute1`.`Cuti`.`lamaCuti`), '0')
  ) AS `sisaCuti`
FROM
  (
    (
      `enryucom_cute1`.`User`
      JOIN `enryucom_cute1`.`JenisCuti`
    )
    LEFT JOIN `enryucom_cute1`.`Cuti` ON(
      (
        (
          `enryucom_cute1`.`JenisCuti`.`id` = `enryucom_cute1`.`Cuti`.`idJenisCuti`
        )
        AND (`enryucom_cute1`.`User`.`nip` = `enryucom_cute1`.`Cuti`.`nip`)
        AND (`enryucom_cute1`.`Cuti`.`statusAkhir` = 'diterima')
        AND (
          year(`enryucom_cute1`.`Cuti`.`tanggalPengajuan`) = (year(NOW()) - 1)
        )
      )
    )
  )
GROUP BY
  `enryucom_cute1`.`User`.`nip`,
  `enryucom_cute1`.`User`.`id`,
  `enryucom_cute1`.`User`.`namaLengkap`,
  `enryucom_cute1`.`JenisCuti`.`id`


--   

SELECT
  `enryucom_cute1`.`User`.`id` AS `userId`,
  `enryucom_cute1`.`User`.`nip` AS `nip`,
  `enryucom_cute1`.`User`.`namaLengkap` AS `namaLengkap`,
  `enryucom_cute1`.`JenisCuti`.`id` AS `idJenisCuti`,
  concat(
    `enryucom_cute1`.`JenisCuti`.`namaCuti`,
    ' ',
(year(NOW()) - 2)
  ) AS `namaCuti`,
  coalesce(sum(`enryucom_cute1`.`Cuti`.`lamaCuti`), 0) AS `lamaCuti`,
(
    `enryucom_cute1`.`JenisCuti`.`lamaCuti` - coalesce(sum(`enryucom_cute1`.`Cuti`.`lamaCuti`), '0')
  ) AS `sisaCuti`
FROM
  (
    (
      `enryucom_cute1`.`User`
      JOIN `enryucom_cute1`.`JenisCuti`
    )
    LEFT JOIN `enryucom_cute1`.`Cuti` ON(
      (
        (
          `enryucom_cute1`.`JenisCuti`.`id` = `enryucom_cute1`.`Cuti`.`idJenisCuti`
        )
        AND (`enryucom_cute1`.`User`.`nip` = `enryucom_cute1`.`Cuti`.`nip`)
        AND (`enryucom_cute1`.`Cuti`.`statusAkhir` = 'diterima')
        AND (
          year(`enryucom_cute1`.`Cuti`.`tanggalPengajuan`) = (year(NOW()) - 2)
        )
      )
    )
  )
GROUP BY
  `enryucom_cute1`.`User`.`nip`,
  `enryucom_cute1`.`User`.`id`,
  `enryucom_cute1`.`User`.`namaLengkap`,
  `enryucom_cute1`.`JenisCuti`.`id`