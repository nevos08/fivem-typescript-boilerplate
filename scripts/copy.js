import fs from 'fs'
import path from 'path'

const copyDirectory = async (src, dest) => {
    const [entries] = await Promise.all([
        fs.promises.readdir(src, { withFileTypes: true }),
        fs.promises.mkdir(dest, { recursive: true }),
    ])

    await Promise.all(
        entries.map((entry) => {
            const srcPath = path.join(src, entry.name)
            const destPath = path.join(dest, entry.name)
            return entry.isDirectory()
                ? copyDirectory(srcPath, destPath)
                : fs.promises.copyFile(srcPath, destPath)
        })
    )
}

export const copy = (src, dest) => {
    if (fs.statSync(src).isDirectory()) {
        console.log('copying directory:', src)

        copyDirectory(src, dest).then(() => {
            console.log('copied directory:', src, '->', dest)
        })

        return
    }

    fs.copyFile(src, dest, (err) => {
        if (!err) {
            console.log('copied', src, '->', dest)
            return
        }

        console.error('failed to copy', src, 'err:', err)
        process.exit(-1)
    })
}
