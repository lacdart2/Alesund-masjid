import { PrayerTime, PrayerKey } from '@/types'

export const PRAYER_TIMES: Omit<PrayerTime, 'id'>[] = [
    { date: '2026-02-18', fajr: '06:43', sunrise: '08:14', dhuhr: '12:49', asr: '14:49', maghrib: '17:26', isha: '18:56' },
    { date: '2026-02-19', fajr: '06:40', sunrise: '08:10', dhuhr: '12:49', asr: '14:51', maghrib: '17:29', isha: '18:58' },
    { date: '2026-02-20', fajr: '06:37', sunrise: '08:07', dhuhr: '12:49', asr: '14:54', maghrib: '17:32', isha: '19:01' },
    { date: '2026-02-21', fajr: '06:34', sunrise: '08:04', dhuhr: '12:49', asr: '14:56', maghrib: '17:35', isha: '19:04' },
    { date: '2026-02-22', fajr: '06:31', sunrise: '08:01', dhuhr: '12:49', asr: '14:58', maghrib: '17:38', isha: '19:07' },
    { date: '2026-02-23', fajr: '06:28', sunrise: '07:58', dhuhr: '12:49', asr: '15:00', maghrib: '17:41', isha: '19:10' },
    { date: '2026-02-24', fajr: '06:25', sunrise: '07:55', dhuhr: '12:49', asr: '15:02', maghrib: '17:44', isha: '19:13' },
    { date: '2026-02-25', fajr: '06:22', sunrise: '07:52', dhuhr: '12:49', asr: '15:04', maghrib: '17:46', isha: '19:16' },
    { date: '2026-02-26', fajr: '06:19', sunrise: '07:48', dhuhr: '12:48', asr: '15:06', maghrib: '17:49', isha: '19:19' },
    { date: '2026-02-27', fajr: '06:16', sunrise: '07:45', dhuhr: '12:48', asr: '15:08', maghrib: '17:52', isha: '19:22' },
    { date: '2026-02-28', fajr: '06:13', sunrise: '07:42', dhuhr: '12:48', asr: '15:10', maghrib: '17:55', isha: '19:25' },
    { date: '2026-03-01', fajr: '06:10', sunrise: '07:39', dhuhr: '12:48', asr: '15:12', maghrib: '17:58', isha: '19:29' },
    { date: '2026-03-02', fajr: '06:07', sunrise: '07:36', dhuhr: '12:48', asr: '15:14', maghrib: '18:01', isha: '19:30' },
    { date: '2026-03-03', fajr: '06:03', sunrise: '07:32', dhuhr: '12:47', asr: '15:16', maghrib: '18:04', isha: '19:32' },
    { date: '2026-03-04', fajr: '06:00', sunrise: '07:29', dhuhr: '12:47', asr: '15:18', maghrib: '18:06', isha: '19:34' },
    { date: '2026-03-05', fajr: '05:56', sunrise: '07:26', dhuhr: '12:47', asr: '15:20', maghrib: '18:09', isha: '19:36' },
    { date: '2026-03-06', fajr: '05:53', sunrise: '07:23', dhuhr: '12:47', asr: '15:22', maghrib: '18:12', isha: '19:39' },
    { date: '2026-03-07', fajr: '05:49', sunrise: '07:19', dhuhr: '12:47', asr: '15:24', maghrib: '18:15', isha: '19:41' },
    { date: '2026-03-08', fajr: '05:46', sunrise: '07:16', dhuhr: '12:46', asr: '15:26', maghrib: '18:18', isha: '19:42' },
    { date: '2026-03-09', fajr: '05:42', sunrise: '07:13', dhuhr: '12:46', asr: '15:28', maghrib: '18:20', isha: '19:44' },
    { date: '2026-03-10', fajr: '05:38', sunrise: '07:09', dhuhr: '12:46', asr: '15:32', maghrib: '18:23', isha: '19:46' },
    { date: '2026-03-11', fajr: '05:35', sunrise: '07:06', dhuhr: '12:46', asr: '15:34', maghrib: '18:26', isha: '19:49' },
    { date: '2026-03-12', fajr: '05:31', sunrise: '07:03', dhuhr: '12:45', asr: '15:36', maghrib: '18:29', isha: '19:51' },
    { date: '2026-03-13', fajr: '05:27', sunrise: '07:00', dhuhr: '12:45', asr: '15:37', maghrib: '18:32', isha: '19:53' },
    { date: '2026-03-14', fajr: '05:23', sunrise: '06:56', dhuhr: '12:45', asr: '15:39', maghrib: '18:34', isha: '19:55' },
    { date: '2026-03-15', fajr: '05:19', sunrise: '06:53', dhuhr: '12:44', asr: '15:41', maghrib: '18:37', isha: '19:57' },
    { date: '2026-03-16', fajr: '05:15', sunrise: '06:50', dhuhr: '12:44', asr: '15:43', maghrib: '18:40', isha: '20:00' },
    { date: '2026-03-17', fajr: '05:11', sunrise: '06:46', dhuhr: '12:44', asr: '15:45', maghrib: '18:43', isha: '20:03' },
    { date: '2026-03-18', fajr: '05:07', sunrise: '06:43', dhuhr: '12:44', asr: '15:47', maghrib: '18:45', isha: '20:06' },
    { date: '2026-03-19', fajr: '05:03', sunrise: '06:40', dhuhr: '12:43', asr: '15:49', maghrib: '18:48', isha: '20:08' },
    { date: '2026-03-20', fajr: '05:00', sunrise: '06:36', dhuhr: '12:43', asr: '15:50', maghrib: '18:51', isha: '20:10' },
    { date: '2026-03-21', fajr: '04:55', sunrise: '06:33', dhuhr: '12:43', asr: '15:50', maghrib: '18:53', isha: '20:11' },
    { date: '2026-03-22', fajr: '04:50', sunrise: '06:30', dhuhr: '12:42', asr: '15:52', maghrib: '18:55', isha: '20:13' },
    { date: '2026-03-23', fajr: '04:45', sunrise: '06:26', dhuhr: '12:42', asr: '15:54', maghrib: '18:58', isha: '20:15' },
    { date: '2026-03-24', fajr: '04:41', sunrise: '06:23', dhuhr: '12:42', asr: '15:56', maghrib: '19:01', isha: '20:17' },
    { date: '2026-03-25', fajr: '04:36', sunrise: '06:20', dhuhr: '12:41', asr: '15:57', maghrib: '19:04', isha: '20:19' },
    { date: '2026-03-26', fajr: '04:31', sunrise: '06:16', dhuhr: '12:41', asr: '15:59', maghrib: '19:06', isha: '20:22' },
    { date: '2026-03-27', fajr: '04:27', sunrise: '06:13', dhuhr: '12:41', asr: '16:01', maghrib: '19:09', isha: '20:24' },
    { date: '2026-03-28', fajr: '04:22', sunrise: '06:10', dhuhr: '12:41', asr: '16:02', maghrib: '19:12', isha: '20:26' },
    { date: '2026-03-29', fajr: '05:16', sunrise: '07:06', dhuhr: '13:40', asr: '17:04', maghrib: '20:14', isha: '21:28' },
    { date: '2026-03-30', fajr: '05:11', sunrise: '07:03', dhuhr: '13:40', asr: '17:06', maghrib: '20:17', isha: '21:30' },
    { date: '2026-03-31', fajr: '05:06', sunrise: '07:00', dhuhr: '13:40', asr: '17:07', maghrib: '20:20', isha: '21:32' },
    // april
    { date: '2026-04-01', fajr: '05:03', sunrise: '06:56', dhuhr: '13:39', asr: '17:08', maghrib: '20:23', isha: '21:34' },
    { date: '2026-04-02', fajr: '04:58', sunrise: '06:53', dhuhr: '13:39', asr: '17:10', maghrib: '20:25', isha: '21:36' },
    { date: '2026-04-03', fajr: '04:52', sunrise: '06:50', dhuhr: '13:38', asr: '17:11', maghrib: '20:28', isha: '21:39' },
    { date: '2026-04-04', fajr: '04:46', sunrise: '06:46', dhuhr: '13:38', asr: '17:13', maghrib: '20:31', isha: '21:42' },
    { date: '2026-04-05', fajr: '04:41', sunrise: '06:43', dhuhr: '13:38', asr: '17:14', maghrib: '20:34', isha: '21:44' },
    { date: '2026-04-06', fajr: '04:39', sunrise: '06:40', dhuhr: '13:38', asr: '17:16', maghrib: '20:36', isha: '21:47' },
    { date: '2026-04-07', fajr: '04:37', sunrise: '06:37', dhuhr: '13:37', asr: '17:17', maghrib: '20:39', isha: '21:50' },
    { date: '2026-04-08', fajr: '04:35', sunrise: '06:33', dhuhr: '13:37', asr: '17:19', maghrib: '20:42', isha: '21:53' },
    { date: '2026-04-09', fajr: '04:33', sunrise: '06:30', dhuhr: '13:37', asr: '17:20', maghrib: '20:45', isha: '21:56' },
    { date: '2026-04-10', fajr: '04:31', sunrise: '06:27', dhuhr: '13:37', asr: '17:22', maghrib: '20:48', isha: '21:58' },
    { date: '2026-04-11', fajr: '04:29', sunrise: '06:23', dhuhr: '13:37', asr: '17:23', maghrib: '20:50', isha: '22:01' },
    { date: '2026-04-12', fajr: '04:28', sunrise: '06:20', dhuhr: '13:37', asr: '17:25', maghrib: '20:53', isha: '22:04' },
    { date: '2026-04-13', fajr: '04:26', sunrise: '06:17', dhuhr: '13:36', asr: '17:26', maghrib: '20:56', isha: '22:07' },
    { date: '2026-04-14', fajr: '04:25', sunrise: '06:13', dhuhr: '13:36', asr: '17:28', maghrib: '20:59', isha: '22:09' },
    { date: '2026-04-15', fajr: '04:23', sunrise: '06:10', dhuhr: '13:36', asr: '17:29', maghrib: '21:02', isha: '22:12' },
    { date: '2026-04-16', fajr: '04:22', sunrise: '06:07', dhuhr: '13:35', asr: '17:30', maghrib: '21:04', isha: '22:15' },
    { date: '2026-04-17', fajr: '04:20', sunrise: '06:04', dhuhr: '13:35', asr: '17:32', maghrib: '21:07', isha: '22:18' },
    { date: '2026-04-18', fajr: '04:19', sunrise: '06:00', dhuhr: '13:35', asr: '17:33', maghrib: '21:10', isha: '22:21' },
    { date: '2026-04-19', fajr: '04:17', sunrise: '05:57', dhuhr: '13:35', asr: '17:34', maghrib: '21:13', isha: '22:24' },
    { date: '2026-04-20', fajr: '04:16', sunrise: '05:54', dhuhr: '13:35', asr: '17:35', maghrib: '21:16', isha: '22:26' },
    { date: '2026-04-21', fajr: '04:14', sunrise: '05:51', dhuhr: '13:34', asr: '17:36', maghrib: '21:18', isha: '22:29' },
    { date: '2026-04-22', fajr: '04:12', sunrise: '05:47', dhuhr: '13:34', asr: '17:37', maghrib: '21:21', isha: '22:32' },
    { date: '2026-04-23', fajr: '04:11', sunrise: '05:44', dhuhr: '13:34', asr: '17:38', maghrib: '21:24', isha: '22:35' },
    { date: '2026-04-24', fajr: '04:10', sunrise: '05:41', dhuhr: '13:34', asr: '17:39', maghrib: '21:27', isha: '22:38' },
    { date: '2026-04-25', fajr: '04:08', sunrise: '05:38', dhuhr: '13:34', asr: '17:40', maghrib: '21:30', isha: '22:41' },
    { date: '2026-04-26', fajr: '04:07', sunrise: '05:35', dhuhr: '13:33', asr: '17:41', maghrib: '21:33', isha: '22:43' },
    { date: '2026-04-27', fajr: '04:06', sunrise: '05:31', dhuhr: '13:33', asr: '17:43', maghrib: '21:36', isha: '22:46' },
    { date: '2026-04-28', fajr: '04:04', sunrise: '05:28', dhuhr: '13:33', asr: '17:44', maghrib: '21:38', isha: '22:49' },
    { date: '2026-04-29', fajr: '04:03', sunrise: '05:25', dhuhr: '13:33', asr: '17:45', maghrib: '21:41', isha: '22:52' },
    { date: '2026-04-30', fajr: '04:02', sunrise: '05:22', dhuhr: '13:32', asr: '17:46', maghrib: '21:44', isha: '22:55' },
    //mai
    { date: '2026-05-01', fajr: '03:58', sunrise: '05:19', dhuhr: '13:30', asr: '17:47', maghrib: '21:47', isha: '22:47' },
    { date: '2026-05-02', fajr: '03:55', sunrise: '05:16', dhuhr: '13:30', asr: '17:48', maghrib: '21:50', isha: '22:50' },
    { date: '2026-05-03', fajr: '03:52', sunrise: '05:13', dhuhr: '13:30', asr: '17:49', maghrib: '21:53', isha: '22:53' },
    { date: '2026-05-04', fajr: '03:48', sunrise: '05:10', dhuhr: '13:30', asr: '17:50', maghrib: '21:56', isha: '22:56' },
    { date: '2026-05-05', fajr: '03:44', sunrise: '05:07', dhuhr: '13:30', asr: '17:51', maghrib: '21:59', isha: '22:59' },
    { date: '2026-05-06', fajr: '03:41', sunrise: '05:04', dhuhr: '13:30', asr: '17:52', maghrib: '22:02', isha: '23:02' },
    { date: '2026-05-07', fajr: '03:38', sunrise: '05:01', dhuhr: '13:30', asr: '17:53', maghrib: '22:05', isha: '23:05' },
    { date: '2026-05-08', fajr: '03:34', sunrise: '04:58', dhuhr: '13:30', asr: '17:54', maghrib: '22:07', isha: '23:07' },
    { date: '2026-05-09', fajr: '03:31', sunrise: '04:55', dhuhr: '13:30', asr: '17:55', maghrib: '22:10', isha: '23:10' },
    { date: '2026-05-10', fajr: '03:28', sunrise: '04:52', dhuhr: '13:30', asr: '17:56', maghrib: '22:13', isha: '23:13' },
    { date: '2026-05-11', fajr: '03:24', sunrise: '04:49', dhuhr: '13:30', asr: '17:57', maghrib: '22:16', isha: '23:16' },
    { date: '2026-05-12', fajr: '03:21', sunrise: '04:46', dhuhr: '13:30', asr: '17:58', maghrib: '22:19', isha: '23:19' },
    { date: '2026-05-13', fajr: '03:18', sunrise: '04:43', dhuhr: '13:30', asr: '17:59', maghrib: '22:22', isha: '23:22' },
    { date: '2026-05-14', fajr: '03:15', sunrise: '04:40', dhuhr: '13:30', asr: '18:00', maghrib: '22:25', isha: '23:25' },
    { date: '2026-05-15', fajr: '03:12', sunrise: '04:37', dhuhr: '13:30', asr: '18:01', maghrib: '22:27', isha: '23:27' },
    { date: '2026-05-16', fajr: '03:09', sunrise: '04:35', dhuhr: '13:30', asr: '18:02', maghrib: '22:30', isha: '23:30' },
    { date: '2026-05-17', fajr: '03:06', sunrise: '04:32', dhuhr: '13:30', asr: '18:03', maghrib: '22:33', isha: '23:33' },
    { date: '2026-05-18', fajr: '03:03', sunrise: '04:29', dhuhr: '13:30', asr: '18:04', maghrib: '22:36', isha: '23:36' },
    { date: '2026-05-19', fajr: '03:00', sunrise: '04:26', dhuhr: '13:30', asr: '18:05', maghrib: '22:38', isha: '23:38' },
    { date: '2026-05-20', fajr: '02:57', sunrise: '04:24', dhuhr: '13:30', asr: '18:06', maghrib: '22:41', isha: '23:41' },
    { date: '2026-05-21', fajr: '02:54', sunrise: '04:21', dhuhr: '13:30', asr: '18:07', maghrib: '22:44', isha: '23:44' },
    { date: '2026-05-22', fajr: '02:51', sunrise: '04:19', dhuhr: '13:30', asr: '18:08', maghrib: '22:47', isha: '23:47' },
    { date: '2026-05-23', fajr: '02:48', sunrise: '04:16', dhuhr: '13:30', asr: '18:09', maghrib: '22:49', isha: '23:49' },
    { date: '2026-05-24', fajr: '02:45', sunrise: '04:14', dhuhr: '13:30', asr: '18:10', maghrib: '22:52', isha: '23:52' },
    { date: '2026-05-25', fajr: '02:42', sunrise: '04:11', dhuhr: '13:30', asr: '18:11', maghrib: '22:54', isha: '23:54' },
    { date: '2026-05-26', fajr: '02:40', sunrise: '04:09', dhuhr: '13:30', asr: '18:11', maghrib: '22:57', isha: '23:57' },
    { date: '2026-05-27', fajr: '02:37', sunrise: '04:07', dhuhr: '13:30', asr: '18:12', maghrib: '22:59', isha: '23:59' },
    { date: '2026-05-28', fajr: '02:35', sunrise: '04:04', dhuhr: '13:31', asr: '18:13', maghrib: '23:02', isha: '00:02' },
    { date: '2026-05-29', fajr: '02:33', sunrise: '04:02', dhuhr: '13:31', asr: '18:14', maghrib: '23:04', isha: '00:04' },
    { date: '2026-05-30', fajr: '02:31', sunrise: '04:00', dhuhr: '13:31', asr: '18:15', maghrib: '23:07', isha: '00:07' },
    { date: '2026-05-31', fajr: '02:29', sunrise: '03:58', dhuhr: '13:31', asr: '18:15', maghrib: '23:09', isha: '00:09' },
    // june
    { date: "2026-06-01", fajr: "02:26", sunrise: "03:56", dhuhr: "13:33", asr: "18:16", maghrib: "23:11", isha: "00:11" },
    { date: "2026-06-02", fajr: "02:24", sunrise: "03:54", dhuhr: "13:33", asr: "18:17", maghrib: "23:13", isha: "00:13" },
    { date: "2026-06-03", fajr: "02:22", sunrise: "03:52", dhuhr: "13:34", asr: "18:17", maghrib: "23:15", isha: "00:15" },
    { date: "2026-06-04", fajr: "02:21", sunrise: "03:51", dhuhr: "13:34", asr: "18:18", maghrib: "23:18", isha: "00:18" },
    { date: "2026-06-05", fajr: "02:19", sunrise: "03:49", dhuhr: "13:34", asr: "18:19", maghrib: "23:19", isha: "00:19" },
    { date: "2026-06-06", fajr: "02:17", sunrise: "03:47", dhuhr: "13:34", asr: "18:19", maghrib: "23:21", isha: "00:21" },
    { date: "2026-06-07", fajr: "02:16", sunrise: "03:46", dhuhr: "13:34", asr: "18:20", maghrib: "23:23", isha: "00:23" },
    { date: "2026-06-08", fajr: "02:15", sunrise: "03:45", dhuhr: "13:34", asr: "18:20", maghrib: "23:25", isha: "00:25" },
    { date: "2026-06-09", fajr: "02:13", sunrise: "03:43", dhuhr: "13:35", asr: "18:21", maghrib: "23:26", isha: "00:26" },
    { date: "2026-06-10", fajr: "02:12", sunrise: "03:42", dhuhr: "13:35", asr: "18:21", maghrib: "23:28", isha: "00:28" },
    { date: "2026-06-11", fajr: "02:11", sunrise: "03:41", dhuhr: "13:35", asr: "18:22", maghrib: "23:29", isha: "00:29" },
    { date: "2026-06-12", fajr: "02:10", sunrise: "03:40", dhuhr: "13:35", asr: "18:22", maghrib: "23:30", isha: "00:30" },
    { date: "2026-06-13", fajr: "02:09", sunrise: "03:39", dhuhr: "13:35", asr: "18:23", maghrib: "23:31", isha: "00:31" },
    { date: "2026-06-14", fajr: "02:09", sunrise: "03:39", dhuhr: "13:36", asr: "18:23", maghrib: "23:33", isha: "00:33" },
    { date: "2026-06-15", fajr: "02:08", sunrise: "03:38", dhuhr: "13:36", asr: "18:24", maghrib: "23:34", isha: "00:34" },
    { date: "2026-06-16", fajr: "02:07", sunrise: "03:37", dhuhr: "13:36", asr: "18:24", maghrib: "23:34", isha: "00:34" },
    { date: "2026-06-17", fajr: "02:07", sunrise: "03:37", dhuhr: "13:36", asr: "18:24", maghrib: "23:35", isha: "00:35" },
    { date: "2026-06-18", fajr: "02:07", sunrise: "03:37", dhuhr: "13:36", asr: "18:25", maghrib: "23:36", isha: "00:36" },
    { date: "2026-06-19", fajr: "02:07", sunrise: "03:37", dhuhr: "13:37", asr: "18:25", maghrib: "23:36", isha: "00:36" },
    { date: "2026-06-20", fajr: "02:07", sunrise: "03:37", dhuhr: "13:37", asr: "18:25", maghrib: "23:36", isha: "00:36" },
    { date: "2026-06-21", fajr: "02:07", sunrise: "03:37", dhuhr: "13:37", asr: "18:25", maghrib: "23:37", isha: "00:37" },
    { date: "2026-06-22", fajr: "02:07", sunrise: "03:37", dhuhr: "13:37", asr: "18:26", maghrib: "23:37", isha: "00:37" },
    { date: "2026-06-23", fajr: "02:07", sunrise: "03:37", dhuhr: "13:37", asr: "18:26", maghrib: "23:37", isha: "00:37" },
    { date: "2026-06-24", fajr: "02:08", sunrise: "03:38", dhuhr: "13:38", asr: "18:26", maghrib: "23:37", isha: "00:37" },
    { date: "2026-06-25", fajr: "02:08", sunrise: "03:38", dhuhr: "13:38", asr: "18:26", maghrib: "23:36", isha: "00:36" },
    { date: "2026-06-26", fajr: "02:09", sunrise: "03:39", dhuhr: "13:38", asr: "18:26", maghrib: "23:36", isha: "00:36" },
    { date: "2026-06-27", fajr: "02:10", sunrise: "03:40", dhuhr: "13:38", asr: "18:26", maghrib: "23:35", isha: "00:35" },
    { date: "2026-06-28", fajr: "02:11", sunrise: "03:41", dhuhr: "13:39", asr: "18:26", maghrib: "23:35", isha: "00:35" },
    { date: "2026-06-29", fajr: "02:12", sunrise: "03:42", dhuhr: "13:39", asr: "18:26", maghrib: "23:34", isha: "00:34" },
    { date: "2026-06-30", fajr: "02:13", sunrise: "03:43", dhuhr: "13:39", asr: "18:26", maghrib: "23:33", isha: "00:33" },
]


function getLocalDateString(): string {
    return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Oslo' })
}

function getNowMinutesOslo(): number {
    const now = new Date()
    const osloTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Oslo' }))
    return osloTime.getHours() * 60 + osloTime.getMinutes()
}

function getNowSecondsOslo(): number {
    const now = new Date()
    const osloTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Oslo' }))
    return osloTime.getSeconds()
}

export function getTodayPrayers(): Omit<PrayerTime, 'id'> {
    const today = getLocalDateString()
    return PRAYER_TIMES.find(p => p.date === today) ?? PRAYER_TIMES[PRAYER_TIMES.length - 1]
}

/* export function toMinutes(time: string): number {
    if (!time || time === '--:--') return 9999
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
} */
export function toMinutes(time: string): number {
    if (!time || time === '--:--') return 9999
    const [h, m] = time.split(':').map(Number)
    const minutes = h * 60 + m
    // If time is past midnight (e.g. 00:02, 00:09) treat as next day
    return minutes < 60 ? minutes + 24 * 60 : minutes
}
export function getNextPrayer(data: Omit<PrayerTime, 'id'>): { key: PrayerKey; time: string; isTomorrow?: boolean } {
    const current = getNowMinutesOslo()
    const keys: PrayerKey[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']

    // After Fajr passes → show Shorouk as next
    const fajrMin = toMinutes(data.fajr)
    const sunriseMin = toMinutes(data.sunrise)
    if (current >= fajrMin && current < sunriseMin) {
        return { key: 'sunrise', time: data.sunrise }
    }

    // Normal case — find next upcoming prayer today
    const found = keys.find(k => toMinutes(data[k]) > current)
    if (found) return { key: found, time: data[found] }

    // All prayers passed — return tomorrow's Fajr
    const todayDate = getLocalDateString()
    const todayIndex = PRAYER_TIMES.findIndex(p => p.date === todayDate)
    const tomorrow = PRAYER_TIMES[todayIndex + 1] ?? PRAYER_TIMES[PRAYER_TIMES.length - 1]
    return { key: 'fajr', time: tomorrow.fajr, isTomorrow: true }
}
export function formatCountdown(targetTime: string): string {
    const current = getNowMinutesOslo()
    const seconds = getNowSecondsOslo()
    let diff = toMinutes(targetTime) - current
    if (diff < 0) diff += 24 * 60
    const h = Math.floor(diff / 60)
    const m = diff % 60
    const s = 59 - seconds
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}