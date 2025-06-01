import bcrypt from 'bcrypt';

const saltRounds = 10;


export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw new Error('Error hashing password: ' + error.message);
    }
};

export const comparePassword = async (password, hash) => {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    } catch (error) {
        throw new Error('Error comparing password: ' + error.message);
    }
}
