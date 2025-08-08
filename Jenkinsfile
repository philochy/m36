pipeline {
    agent any
    tools {
      nodejs "node18.15.0" // 这里的名称要与Global Tool Configuration中配置的Node.js名称一致
    }

    environment {
        // 添加目标目录变量（按需修改路径）
        DEPLOY_DIR   = '/www/wwwroot/chenhy/m36'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    sh "npm install"
                    sh "npm run dev:generate"

                    echo "构建完成，输出目录: dist/"
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // 确保目标目录存在（如果不存在则创建）
                    sh "mkdir -p ${env.DEPLOY_DIR} || true"

                    // 清空目标目录（保留目录结构）
                    sh "find ${env.DEPLOY_DIR} -mindepth 1 -delete || true"

                    // 复制dist目录所有内容到目标目录
                    sh "cp -R dist/* ${env.DEPLOY_DIR}/"

                    echo "已将构建文件部署到: ${env.DEPLOY_DIR}"
                }
            }
        }
    }

    post {
        always {
            // 归档构建产物
            archiveArtifacts artifacts: 'dist/**/*', fingerprint: true

            // 记录部署信息
            sh "echo '部署目录: ${env.DEPLOY_DIR}' > deployment.info"
            archiveArtifacts artifacts: 'deployment.info', fingerprint: true

            junit 'build/reports/**/*.xml'
        }
    }
}
