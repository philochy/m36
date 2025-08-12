pipeline {
    agent any
    tools {
      nodejs "node18.15.0" // 这里的名称要与Global Tool Configuration中配置的Node.js名称一致
    }

    environment {
        // 添加目标目录变量（按需修改路径）
        DEPLOY_DIR   = '/www/wwwroot/chenhy/m36'


        CURRENT_USER = sh(script: 'whoami', returnStdout: true).trim()
        WORKSPACE_PATH = sh(script: 'pwd', returnStdout: true).trim()
    }

    stages {
        stage('Build') {
            steps {
                script {
                    sh "npm install"
                    sh "npm run dev:generate"

                    // 验证构建产物
                    sh "ls -la dist || true"
                    sh 'echo "构建输出目录大小: $(du -sh dist)"'

                    echo "构建完成，输出目录: dist/"
                }
            }
        }

        stage('Debug Info') {
            steps {
                script {
                    // 打印关键信息
                    echo "================================================"
                    echo "当前用户: ${env.CURRENT_USER}"
                    echo "工作空间路径: ${env.WORKSPACE_PATH}"
                    echo "目标部署目录: ${env.DEPLOY_DIR}"
                    echo "================================================"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // 确保目标目录存在（如果不存在则创建）
                    sh "sudo mkdir -p ${env.DEPLOY_DIR} || true"

                    // 清空目标目录（保留目录结构）
                    sh "sudo find ${env.DEPLOY_DIR} -mindepth 1 ! -name '.user.ini' -delete || true"

                    // 复制dist目录所有内容到目标目录
                    sh "sudo cp -R dist/* ${env.DEPLOY_DIR}/"

                    // 设置正确的文件权限（按需调整）
                    sh "sudo chown -R www-data:www-data ${env.DEPLOY_DIR}"
                    sh "sudo chmod -R 755 ${env.DEPLOY_DIR}"

                    echo "已将构建文件部署到: ${env.DEPLOY_DIR}"
                }
            }
        }
    }

    post {
        success {
            echo '构建和部署成功!'
        }
        failure {
            echo '构建或部署失败，请检查日志!'
        }
    }
}
