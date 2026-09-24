/**
 * SIAKAD - Sistem Informasi Akademik & Penilaian Data Store
 * Utility for managing LocalStorage state and business logic
 */

const SIAKAD = {
    // Initial Seed Data
    defaultProdi: [
        { id: 1, kode: "PR001", nama: "Teknik Informatika", jenjang: "S1", kaprodi: "Dr. Budi Santoso, M.Kom", akreditasi: "Unggul" },
        { id: 2, kode: "PR002", nama: "Sistem Informasi", jenjang: "S1", kaprodi: "Siti Aminah, M.T.", akreditasi: "Baik Sekali" },
        { id: 3, kode: "PR003", nama: "Teknologi Informasi", jenjang: "D3", kaprodi: "Ahmad Dahlan, M.Sc", akreditasi: "Baik" },
        { id: 4, kode: "PR004", nama: "Sains Data", jenjang: "S1", kaprodi: "Dr. Retno Wulandari, M.Si", akreditasi: "Unggul" }
    ],

    defaultMahasiswa: [
        { id: 1, nim: "230101001", nama: "Aditya Pratama", prodiKode: "PR001", prodiNama: "Teknik Informatika", angkatan: "2023", gender: "Laki-laki", email: "aditya@student.ac.id", status: "Aktif" },
        { id: 2, nim: "230101002", nama: "Siti Nurhaliza", prodiKode: "PR001", prodiNama: "Teknik Informatika", angkatan: "2023", gender: "Perempuan", email: "siti@student.ac.id", status: "Aktif" },
        { id: 3, nim: "230102001", nama: "Bagas Rahadian", prodiKode: "PR002", prodiNama: "Sistem Informasi", angkatan: "2023", gender: "Laki-laki", email: "bagas@student.ac.id", status: "Aktif" },
        { id: 4, nim: "230103001", nama: "Dewi Anggraini", prodiKode: "PR003", prodiNama: "Teknologi Informasi", angkatan: "2022", gender: "Perempuan", email: "dewi@student.ac.id", status: "Aktif" },
        { id: 5, nim: "230104001", nama: "Fajar Ramadan", prodiKode: "PR004", prodiNama: "Sains Data", angkatan: "2023", gender: "Laki-laki", email: "fajar@student.ac.id", status: "Aktif" }
    ],

    defaultPenilaian: [
        { id: 1, kodeTx: "TRX-001", nim: "230101001", namaMahasiswa: "Aditya Pratama", matakuliah: "Pemrograman Web", tugas: 85, uts: 80, uas: 90, nilaiAkhir: 85.5, grade: "A", status: "Lulus" },
        { id: 2, kodeTx: "TRX-002", nim: "230101002", namaMahasiswa: "Siti Nurhaliza", matakuliah: "Pemrograman Web", tugas: 90, uts: 88, uas: 92, nilaiAkhir: 90.2, grade: "A", status: "Lulus" },
        { id: 3, kodeTx: "TRX-003", nim: "230102001", namaMahasiswa: "Bagas Rahadian", matakuliah: "Basis Data", tugas: 75, uts: 70, uas: 68, nilaiAkhir: 70.7, grade: "B", status: "Lulus" },
        { id: 4, kodeTx: "TRX-004", nim: "230103001", namaMahasiswa: "Dewi Anggraini", matakuliah: "Jaringan Komputer", tugas: 60, uts: 55, uas: 50, nilaiAkhir: 54.5, grade: "D", status: "Tidak Lulus" }
    ],

    init() {
        if (!localStorage.getItem('siakad_prodi')) {
            localStorage.setItem('siakad_prodi', JSON.stringify(this.defaultProdi));
        }
        if (!localStorage.getItem('siakad_mahasiswa')) {
            localStorage.setItem('siakad_mahasiswa', JSON.stringify(this.defaultMahasiswa));
        }
        if (!localStorage.getItem('siakad_penilaian')) {
            localStorage.setItem('siakad_penilaian', JSON.stringify(this.defaultPenilaian));
        }
    },

    // PRODI STORAGE
    getProdi() {
        this.init();
        return JSON.parse(localStorage.getItem('siakad_prodi') || '[]');
    },
    saveProdi(data) {
        localStorage.setItem('siakad_prodi', JSON.stringify(data));
    },
    addProdi(item) {
        const list = this.getProdi();
        item.id = Date.now();
        list.push(item);
        this.saveProdi(list);
    },
    updateProdi(id, updatedItem) {
        let list = this.getProdi();
        list = list.map(item => item.id == id ? { ...item, ...updatedItem } : item);
        this.saveProdi(list);
    },
    deleteProdi(id) {
        let list = this.getProdi();
        list = list.filter(item => item.id != id);
        this.saveProdi(list);
    },

    // MAHASISWA STORAGE
    getMahasiswa() {
        this.init();
        return JSON.parse(localStorage.getItem('siakad_mahasiswa') || '[]');
    },
    saveMahasiswa(data) {
        localStorage.setItem('siakad_mahasiswa', JSON.stringify(data));
    },
    addMahasiswa(item) {
        const list = this.getMahasiswa();
        item.id = Date.now();
        list.push(item);
        this.saveMahasiswa(list);
    },
    updateMahasiswa(id, updatedItem) {
        let list = this.getMahasiswa();
        list = list.map(item => item.id == id ? { ...item, ...updatedItem } : item);
        this.saveMahasiswa(list);
    },
    deleteMahasiswa(id) {
        let list = this.getMahasiswa();
        list = list.filter(item => item.id != id);
        this.saveMahasiswa(list);
    },

    // PENILAIAN STORAGE
    getPenilaian() {
        this.init();
        return JSON.parse(localStorage.getItem('siakad_penilaian') || '[]');
    },
    savePenilaian(data) {
        localStorage.setItem('siakad_penilaian', JSON.stringify(data));
    },
    addPenilaian(item) {
        const list = this.getPenilaian();
        item.id = Date.now();
        item.kodeTx = "TRX-" + Math.floor(100 + Math.random() * 900);
        this.calculateGrade(item);
        list.push(item);
        this.savePenilaian(list);
    },
    updatePenilaian(id, updatedItem) {
        let list = this.getPenilaian();
        this.calculateGrade(updatedItem);
        list = list.map(item => item.id == id ? { ...item, ...updatedItem } : item);
        this.savePenilaian(list);
    },
    deletePenilaian(id) {
        let list = this.getPenilaian();
        list = list.filter(item => item.id != id);
        this.savePenilaian(list);
    },

    // Grade Calculator Formula
    calculateGrade(item) {
        const t = parseFloat(item.tugas) || 0;
        const u = parseFloat(item.uts) || 0;
        const ua = parseFloat(item.uas) || 0;
        
        // Weight: Tugas 30%, UTS 30%, UAS 40%
        const finalScore = (t * 0.3) + (u * 0.3) + (ua * 0.4);
        item.nilaiAkhir = Math.round(finalScore * 10) / 10;

        if (finalScore >= 85) {
            item.grade = 'A';
            item.status = 'Lulus';
        } else if (finalScore >= 75) {
            item.grade = 'B+';
            item.status = 'Lulus';
        } else if (finalScore >= 65) {
            item.grade = 'B';
            item.status = 'Lulus';
        } else if (finalScore >= 55) {
            item.grade = 'C';
            item.status = 'Lulus';
        } else if (finalScore >= 45) {
            item.grade = 'D';
            item.status = 'Tidak Lulus';
        } else {
            item.grade = 'E';
            item.status = 'Tidak Lulus';
        }
    }
};

// Auto initialize data
SIAKAD.init();
