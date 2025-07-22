import React, { useRef, useEffect, useState } from 'react';

const generateCaptchaText = (length = 5) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

const ScratchBackground = ({ width = 94, height = 29, onChange }) => {
    const canvasRef = useRef(null);
    const [captchaText, setCaptchaText] = useState('');

    const drawCaptcha = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const text = generateCaptchaText(4); // giảm xuống 4 ký tự
        setCaptchaText(text);
        onChange?.(text);

        // Clear nền
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, width, height);

        // Chữ méo nhỏ
        ctx.font = 'bold 20px Arial';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const angle = (Math.random() - 0.5) * 0.4;
            const x = 10 + i * 20;
            const y = 20 + Math.random() * 2;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.fillStyle = '#00009E'; // màu chữ
            ctx.fillText(char, 0, 0);
            ctx.restore();
        }

        // Nhiễu mỏng
        for (let i = 0; i < 10; i++) {
            ctx.strokeStyle = `rgba(0,0,0,0.1)`;
            ctx.beginPath();
            ctx.moveTo(Math.random() * width, Math.random() * height);
            ctx.lineTo(Math.random() * width, Math.random() * height);
            ctx.stroke();
        }

        // Chấm nhỏ
        for (let i = 0; i < 25; i++) {
            ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.5})`;
            ctx.beginPath();
            ctx.arc(Math.random() * width, Math.random() * height, 0.6, 0, 2 * Math.PI);
            ctx.fill();
        }
    };

    useEffect(() => {
        drawCaptcha();
    }, []);

    const refreshCaptcha = () => {
        drawCaptcha();
    };

    return (
        <div style={{ display: 'inline-block' }}>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                style={{
                    cursor: 'pointer',
                    display: 'block',
                }}
                onClick={refreshCaptcha}
                title="Click để làm mới"
            />
        </div>
    );
};

export default ScratchBackground;
