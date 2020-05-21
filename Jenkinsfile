pipeline {
	agent any

	stages {
		stage('SCM') {
			steps {
				checkout scm
				sh 'echo $GIT_BRANCH'
				sh 'echo $GIT_COMMIT'
			}
		}
		stage('Build') {
			steps {

			}
		}
		stage('Test') {
			steps {
				echo 'Testing..'
			}
		}
		stage('Deploy') {
			steps {
				echo 'Deploying....'
			}
		}
	}
}
