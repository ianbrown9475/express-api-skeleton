pipeline {
    agent { docker { image 'node:10' } }
    stages {
        stage('build') {
            steps {
                sh 'yarn install'
            }
        }
        stage('lint') {
            steps {
                sh 'npm run lint lint'
            }
        }
        stage('test') {
            steps {
                sh 'npm run test'
            }
        }
    }
}
