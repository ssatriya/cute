SELECT
  `cute`.`user`.`id` AS `userId`,
  `cute`.`user`.`nip` AS `nip`,
  `cute`.`user`.`namaLengkap` AS `namaLengkap`,
  `cute`.`jeniscuti`.`id` AS `idJenisCuti`,
  concat(
    `cute`.`jeniscuti`.`namaCuti`,
    ' ',
(year(NOW()) - 1)
  ) AS `namaCuti`,
  coalesce(sum(`cute`.`cuti`.`lamaCuti`), 0) AS `lamaCuti`,
(
    `cute`.`jeniscuti`.`lamaCuti` - coalesce(sum(`cute`.`cuti`.`lamaCuti`), '0')
  ) AS `sisaCuti`
FROM
  (
    (
      `cute`.`user`
      JOIN `cute`.`jeniscuti`
    )
    LEFT JOIN `cute`.`cuti` ON(
      (
        (
          `cute`.`jeniscuti`.`id` = `cute`.`cuti`.`idJenisCuti`
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
  `cute`.`jeniscuti`.`id`