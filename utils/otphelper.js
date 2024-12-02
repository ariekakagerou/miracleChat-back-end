exports.generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); // menghasilkan 6 digit OTP
};

exports.sendOTP = (nomor_telepon, kode_otp) => {
    // Implementasikan logika untuk mengirim OTP, misalnya via SMS API
    console.log(`OTP ${kode_otp} dikirim ke nomor ${nomor_telepon}`);
};