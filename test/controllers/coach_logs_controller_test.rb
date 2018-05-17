require 'test_helper'

class CoachLogsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @coach_log = coach_logs(:one)
  end

  test "should get index" do
    get coach_logs_url, as: :json
    assert_response :success
  end

  test "should create coach_log" do
    assert_difference('CoachLog.count') do
      post coach_logs_url, params: { coach_log: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show coach_log" do
    get coach_log_url(@coach_log), as: :json
    assert_response :success
  end

  test "should update coach_log" do
    patch coach_log_url(@coach_log), params: { coach_log: {  } }, as: :json
    assert_response 200
  end

  test "should destroy coach_log" do
    assert_difference('CoachLog.count', -1) do
      delete coach_log_url(@coach_log), as: :json
    end

    assert_response 204
  end
end
