document.addEventListener('DOMContentLoaded', () => {
    // 게임 상태
    const gameState = {
        leopardSolved: false,
        snakeSolved: false,
        rabbitSolved: false,
        password: ['_', '_', '_', '_']
    };

    // DOM 요소 가져오기
    const modals = {
        start: document.getElementById('start-modal'),
        leopard: document.getElementById('leopard-modal'),
        snake: document.getElementById('snake-modal'),
        rabbit: document.getElementById('rabbit-modal'),
        door: document.getElementById('door-modal')
    };

    const objects = {
        leopard: document.getElementById('leopard-obj'),
        snake: document.getElementById('snake-obj'),
        rabbit: document.getElementById('rabbit-obj'),
        door: document.getElementById('door')
    };

    const passwordDisplay = document.querySelector('#password-display span');
    const hintToast = document.getElementById('hint-toast');

    // 모달 닫기 함수 (현재는 사용하지 않지만, 모달 바깥 클릭 시 닫기 기능 추가 시 유용)
    const closeModal = (modal) => {
        modal.style.display = 'none';
    };

    // 힌트 알림창 표시 함수
    const showToast = (message) => {
        hintToast.textContent = message;
        hintToast.classList.add('show');
        setTimeout(() => {
            hintToast.classList.remove('show');
        }, 3000);
    };

    // 획득한 비밀번호 업데이트 함수
    const updatePasswordDisplay = () => {
        passwordDisplay.textContent = gameState.password.join(' ');
        if (!gameState.password.includes('_')) {
            objects.door.classList.add('unlocked');
            objects.door.querySelector('span').textContent = '탈출구 (활성화)';
            showToast('모든 단서를 찾았습니다! 탈출구를 클릭하여 비밀번호를 입력하세요.');
        }
    };

    // --- 이벤트 리스너 설정 ---

    // 게임 시작
    document.getElementById('start-game-btn').addEventListener('click', () => {
        closeModal(modals.start);
    });

    // 1. 표범 오브젝트
    objects.leopard.addEventListener('click', () => {
        if (!gameState.leopardSolved) {
            modals.leopard.style.display = 'flex';
        } else {
            showToast('이미 표범의 문제를 해결했습니다.');
        }
    });

    document.getElementById('leopard-submit').addEventListener('click', () => {
        const answer = document.getElementById('leopard-answer').value;
        if (answer === '2') {
            alert('정답입니다! 당신은 예리한 관찰력을 가졌군요.');
            gameState.leopardSolved = true;
            gameState.password[0] = '2';
            updatePasswordDisplay();
            objects.leopard.classList.add('completed');
            showToast("힌트 획득: 비밀번호의 첫 번째 숫자는 '2'입니다.");
            closeModal(modals.leopard);
        } else {
            alert('오답입니다. 다시 한번 잘 살펴보세요.');
        }
    });

    // 2. 보아뱀 오브젝트
    objects.snake.addEventListener('click', () => {
        if (!gameState.snakeSolved) {
            if (gameState.leopardSolved) {
                modals.snake.style.display = 'flex';
            } else {
                showToast('아직 해결하지 않은 문제가 있습니다. 순서대로 진행해주세요.');
            }
        } else {
            showToast('이미 보아뱀의 문제를 해결했습니다.');
        }
    });

    document.getElementById('snake-submit').addEventListener('click', () => {
        const answer = document.getElementById('snake-answer').value;
        if (answer === '0') {
            alert('안타깝지만 정답입니다! 배고픈 뱀을 뒤로하고 단서를 얻었습니다.');
            gameState.snakeSolved = true;
            gameState.password[1] = '0';
            updatePasswordDisplay();
            objects.snake.classList.add('completed');
            showToast("힌트 획득: 비밀번호의 두 번째 숫자는 '0'입니다.");
            closeModal(modals.snake);
        } else {
            alert('오답입니다. 문제를 다시 잘 읽어보세요.');
        }
    });

    // 3. 토끼 오브젝트
    objects.rabbit.addEventListener('click', () => {
        if (!gameState.rabbitSolved) {
            if (gameState.snakeSolved) {
                modals.rabbit.style.display = 'flex';
            } else {
                showToast('아직 해결하지 않은 문제가 있습니다. 순서대로 진행해주세요.');
            }
        } else {
            showToast('이미 토끼의 문제를 해결했습니다.');
        }
    });

    document.getElementById('rabbit-submit').addEventListener('click', () => {
        const answer = document.getElementById('rabbit-answer').value;
        if (answer === '0') {
            alert('훌륭해요! 토끼가 당신의 지혜에 감탄하며 마지막 힌트를 건네줍니다.');
            gameState.rabbitSolved = true;
            gameState.password[2] = '2';
            gameState.password[3] = '5';
            updatePasswordDisplay();
            objects.rabbit.classList.add('completed');
            showToast("힌트 획득: 비밀번호의 마지막 두 자리는 2025년에서 2000년을 뺀 숫자와 같습니다.");
            closeModal(modals.rabbit);
        } else {
            alert('오답입니다. 계산을 다시 해보세요!');
        }
    });

    // 4. 문 (최종 탈출)
    objects.door.addEventListener('click', () => {
        if (gameState.leopardSolved && gameState.snakeSolved && gameState.rabbitSolved) {
            modals.door.style.display = 'flex';
        } else {
            showToast('아직 모든 단서를 찾지 못했습니다.');
        }
    });

    document.getElementById('password-submit').addEventListener('click', () => {
        const finalPassword = document.getElementById('password-input').value;
        if (finalPassword === '2025') {
            alert('찰칵! 육중한 소리와 함께 문이 열립니다.\n당신은 신비한 무지개 숲에서 무사히 탈출했습니다! 축하합니다!');
            // 게임 재시작 또는 다른 페이지로 이동
            location.reload();
        } else {
            alert('비밀번호가 틀렸습니다. 획득한 힌트를 다시 확인해보세요.');
        }
    });

    // 초기 비밀번호 표시 업데이트
    updatePasswordDisplay();
});