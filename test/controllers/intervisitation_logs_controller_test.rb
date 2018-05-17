require 'test_helper'

class IntervisitationLogsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @intervisitation_log = intervisitation_logs(:one)
  end

  test "should get index" do
    get intervisitation_logs_url, as: :json
    assert_response :success
  end

  test "should create intervisitation_log" do
    assert_difference('IntervisitationLog.count') do
      post intervisitation_logs_url, params: { intervisitation_log: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show intervisitation_log" do
    get intervisitation_log_url(@intervisitation_log), as: :json
    assert_response :success
  end

  test "should update intervisitation_log" do
    patch intervisitation_log_url(@intervisitation_log), params: { intervisitation_log: {  } }, as: :json
    assert_response 200
  end

  test "should destroy intervisitation_log" do
    assert_difference('IntervisitationLog.count', -1) do
      delete intervisitation_log_url(@intervisitation_log), as: :json
    end

    assert_response 204
  end
end
