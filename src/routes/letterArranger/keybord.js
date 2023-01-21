import { LetterButton } from './letterButton';

export const Keyboard = ({ pause, selectedItem, levels, changeCheck }) => (
    <div className={`flex flex-wrap gap-3 justify-center`}>
        {pause ? (
            <div className='text-4xl font-bold'>
                {selectedItem === levels.length - 1
                    ? '🎉 أحسنت تم حل كل الألغاز 🎉'
                    : '🎉 أحسنت 🎉'}
            </div>
        ) : (
            'أبتثجحخدذرزسشصضطظعغفقكلمنهويةائ'.split('').map((i, l) => {
                return <LetterButton key={l} letter={i} action={changeCheck} />;
            })
        )}
    </div>
);
